import React, { useEffect, useState } from 'react';
import { Box, Button, Code, HStack, IconButton, Text, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

const ViewCommunity = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code'); // URL에서 code 파라미터 가져오기
    const category = searchParams.get('category'); // URL에서 category 파라미터 가져오기
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        // 세션에 저장된 유저 불러오기
        const userSample = sessionStorage.getItem('userInfo');
        if (userSample) {
            const user = JSON.parse(userSample);
            setUser(user);
            console.log("User ID from session:", user.id);
        }

        console.log("code: " + code);
        console.log("category: " + category);

        // 글 상세보기 불러오기
        if (code && category) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다');
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log(responseData);
                    setData(responseData.community);  // `community` 객체로 데이터 설정
                    console.log("커뮤니티 User ID:", responseData.community.userNickname);
                })
                .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
        }
    }, [code, category]);

    // 댓글 리스트 데이터 불러오기
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/communityComment?command=readComment&communityCode=${code}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setComments(data || []); // 댓글 리스트 설정 (undefined인 경우 빈 배열로 설정)
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);

    // 게시글 삭제 버튼
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
                    console.log('게시글 삭제 성공');
                    navigate(`/community/${category}`); // 삭제 후 해당 리스트로 이동
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
    console.log("isOwner:", isOwner);

    // 댓글
    // 댓글 등록하기
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
            console.log("Response Text:", responseText); // 서버 응답 로그
            if (responseText.trim() === "") {
                console.error('빈 응답');
                return;
            }

            const jsonData = JSON.parse(responseText); // JSON 파싱
            console.log("Response Data:", jsonData); // 새로 추가된 댓글 콘솔에 출력

            setComments(prevComments => [jsonData, ...prevComments]);
            setComment(''); // 댓글 입력 필드 초기화
            console.log('댓글 등록 성공');
            // 비동기 처리방식으로 바꿔도 댓글이 바로 안떠서 reload하는 방법을 채택
            // 등록이 한 번 일어나면 alert 창이 뜨기 때문에 도배 방지 가능
            window.location.reload();

        } catch (error) {
            console.error('댓글 등록 중 에러 발생', error);
        }
    };

    // 댓글 삭제하기
    const handleDeleteComment = async (commentCode) => {
        console.log("Attempting to delete comment with code:", commentCode); // commentCode 확인
        fetch(`${process.env.REACT_APP_SERVER_URL}/communityComment?command=deleteComment&commentCode=${commentCode}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('댓글 삭제 성공');
                    alert('댓글이 성공적으로 삭제되었습니다.');
                    window.location.reload();
                } else {
                    console.log('댓글 삭제 실패');
                }
            })
            .catch(error => console.error('게시글을 삭제하는 중 에러 발생', error));
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
        </Box>
    );
};

export default ViewCommunity;