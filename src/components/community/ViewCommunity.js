import React, { useEffect, useRef, useState } from 'react';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Code, HStack, IconButton, Text, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

const ViewCommunity = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const category = searchParams.get('category');
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedCommentCode, setSelectedCommentCode] = useState(null);
    const cancelRef = useRef();

    useEffect(() => {
        const userSample = sessionStorage.getItem('userInfo');
        if (userSample) {
            const user = JSON.parse(userSample);
            setUser(user);
        }

        if (code && category) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다');
                    }
                    return response.json();
                })
                .then(responseData => {
                    setData(responseData.community);
                })
                .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
        }
    }, [code, category]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/communityComment?command=readComment&communityCode=${code}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }
                return response.json();
            })
            .then(data => {
                setComments(data || []);
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=delete&code=${code}`, {
            method: 'DELETE',
            body: JSON.stringify({ code }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    navigate(`/community/${category}`);
                } else {
                    console.log('게시글 삭제 실패');
                }
            })
            .catch(error => console.error('게시글을 삭제하는 중 에러 발생', error));
    };

    // 게시글 수정 버튼
    const handleUpdate = () => {
        navigate(`/community/update?command=update&code=${code}`); // 수정 페이지로 이동
    };

    const isOwner = user && user.nickname === data.userNickname;

    const handleInputComment = async (e) => {
        if (!user) {
            alert('댓글을 작성하려면 로그인이 필요합니다');
            return;
        }

        if (comment.trim() === '') {
            alert('댓글 내용을 입력하세요.');
            return;
        }

        const requestBody = {
            code: code,
            userId: user.id,
            userNickname: user.nickname,
            content: comment.trim()
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/communityComment?command=writeComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('댓글 등록 실패');
            }

            const responseText = await response.text();

            if (responseText.trim() === "") {
                console.error('빈 응답');
                return;
            }

            const jsonData = JSON.parse(responseText);

            setComments(prevComments => [jsonData, ...prevComments]);
            setComment('');

            window.location.reload();

        } catch (error) {
            console.error('댓글 등록 중 에러 발생', error);
        }
    };

    const handleDeleteComment = async (commentCode) => {
        setSelectedCommentCode(commentCode);
        setIsOpen(true);
    };

    const confirmDeleteComment = async () => {
        if (!selectedCommentCode) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/communityComment?command=deleteComment&commentCode=${selectedCommentCode}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert('댓글이 성공적으로 삭제되었습니다.');
                setComments(comments.filter(comment => comment.code !== selectedCommentCode));
            } else {
                console.log('댓글 삭제 실패');
            }
        } catch (error) {
            console.error('댓글을 삭제하는 중 에러 발생', error);
        } finally {
            setIsOpen(false);
            setSelectedCommentCode(null);
        }
    };

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <Box padding="20px">
            <VStack spacing="20px">
                <Text fontSize="2xl" fontWeight="bold">{data.title}</Text>
                <Text fontSize="md" color="gray.500">작성자: {data.userNickname}</Text>
                <Text fontSize="lg">{data.content}</Text>
            </VStack>
            <HStack>
                {isOwner && (
                    <>
                        <Button onClick={handleUpdate} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>수정하기</Button>
                        <Button onClick={handleDelete} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>삭제하기</Button>
                    </>
                )}
            </HStack>
            <Box mt="20px" width="100%" backgroundColor='#e0ccb3'>
                <Text fontSize="md" align="left">댓글</Text>
            </Box>
            <Box>
                {comments.map((comment, index) => (
                    <Box key={index} borderBottom="1px solid #ccc" p="10px">
                        <HStack>
                            <Text fontSize="sm" color="gray.500">{comment.userNickname}</Text>
                            <Text fontSize="md">{comment.content}</Text>
                            {user && user.nickname === comment.userNickname && (
                            <IconButton
                                onClick={() => handleDeleteComment(comment.code)}
                                variant='outline'
                                colorScheme='#ccc'
                                aria-label='Delete Comment'
                                icon={<CloseIcon />}
                            />
                            )}
                        </HStack>
                    </Box>
                ))}
            </Box>
            <Box>
                <Textarea name='comment' value={comment} onChange={handleInputChange} placeholder='내용을 입력하세요.' size='sm' width="100%" mt="10px" />
                <Button onClick={handleInputComment} mt="20px" w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>등록하기</Button>
            </Box>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            댓글 삭제 확인
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            선택한 댓글을 삭제하시겠습니까?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                취소
                            </Button>
                            <Button colorScheme="red" onClick={confirmDeleteComment} ml={3}>
                                삭제
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
};

export default ViewCommunity;