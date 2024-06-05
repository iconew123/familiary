import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiaryDetailInfo } from '../DiaryMain';
import {
    Box, Button, Image, Heading, Text, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
    ModalBody, VStack, FormControl, FormLabel, Input, Textarea, useDisclosure, Select
} from '@chakra-ui/react';

const DiaryView = () => {
    const { date, babycode, id } = useParams();
    const navigate = useNavigate();
    const [serverData, setServerData] = useState();
    const [position, setPosition] = useState();
    const [comments, setComments] = useState([]);
    const { isOpen: isRecordModalOpen, onOpen: onRecordModalOpen, onClose: onRecordModalClose } = useDisclosure();
    const { isOpen: isCommentEditModalOpen, onOpen: onCommentEditModalOpen, onClose: onCommentEditModalClose } = useDisclosure();
    const [commentInput, setCommentInput] = useState('');
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
    const [editCommentInput, setEditCommentInput] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);

    useEffect(() => {
        fetchDiaryDetailInfo(date, babycode).then(response => {
            setServerData(response);
            fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&baby_code=${babycode}&user_id=${id}`)
                .then(response => response.json())
                .then(data => {
                    setPosition(data.position);
                })
                .catch(error => {
                    console.error('Error fetching enroll command:', error);
                });
        });
    }, [date, babycode, id]);

    useEffect(() => {
        if (serverData) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=find&diaryCode=${serverData.code}`)
                .then(response => response.json())
                .then(data => {
                    setComments(data);
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
        }
    }, [serverData]);

    const [diary, setDiary] = useState({
        title: '',
        content: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDiary(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [photo, setPhoto] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    // 다중 클릭방지
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = () => {
        setIsLoading(true);

        if (!diary.title) {
            alert("제목을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (!diary.content) {
            alert("내용을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (!diary.category) {
            alert("카테고리를 선택해주세요.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('date', serverData.date);
        formData.append('babycode', serverData.baby_code);
        formData.append('title', diary.title);
        formData.append('content', diary.content);
        formData.append('category', diary.category);
        if (photo !== null) {
            formData.append('photo', photo);
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=update`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    onRecordModalClose();

                    fetchDiaryDetailInfo(serverData.date, serverData.baby_code)
                        .then(data => {
                            setServerData(data);
                        })
                        .catch(error => {
                            console.error('데이터를 가져오는 중 에러 발생', error);
                            alert('데이터를 가져오는 중 에러가 발생했습니다.');
                        });
                } else {
                    console.log('데이터 전송 실패');
                    alert('데이터 전송에 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.status === 400) {
                    alert(data.message_diary);
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
                alert('데이터 전송 중 에러가 발생했습니다.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleEdit = () => {
        onRecordModalOpen();
        if (serverData) {
            setDiary({
                title: serverData.title || '',
                content: serverData.content || '',
                category: serverData.category || ''
            });
        }
    };

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=delete&babycode=${serverData.baby_code}&date=${serverData.date}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert("다이어리 삭제 성공");
                    navigate('/diary');
                } else {
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Error deleting diary entry:', error);
                navigate('/');
            });
    };

    if (!serverData) {
        return <Box textAlign="center" fontSize="22px" color="#333" mt="40px">Loading...</Box>;
    }

    const isOwner = position && position !== "family";

    const handleCommentSubmit = () => {
        setIsCommentSubmitting(true);

        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('diaryCode', serverData.code);
        formData.append('userNickName', user.nickname);
        formData.append('content', commentInput);

        if (commentInput === null || commentInput === "") {
            alert("댓글 내용을 입력해주세요");
            setIsCommentSubmitting(false)
            return;
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=create`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=find&diaryCode=${serverData.code}`)
                        .then(response => response.json())
                        .then(data => {
                            setComments(data);
                            setCommentInput('');
                            setIsCommentSubmitting(false);
                        })
                        .catch(error => {
                            console.error('댓글 목록 가져오기 에러:', error);
                            setIsCommentSubmitting(false);
                        });
                } else {
                    setIsCommentSubmitting(false);
                }
            })
            .catch(error => {
                console.error('댓글 작성 중 에러:', error);
                setIsCommentSubmitting(false);
            });
    };

    const handleCommentEdit = (comment) => {
        setEditCommentId(comment.code);
        setEditCommentInput(comment.content);
        onCommentEditModalOpen();
    };

    const handleCommentUpdate = () => {
        const formData = new FormData();
        formData.append('code', editCommentId);
        formData.append('content', editCommentInput);

        if (editCommentInput === null || editCommentInput === '') {
            alert("수정할 내용을 입력해주세요.");
            return;
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=update`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=find&diaryCode=${serverData.code}`)
                        .then(response => response.json())
                        .then(data => {
                            setComments(data);
                            onCommentEditModalClose();
                        })
                        .catch(error => {
                            console.error('댓글 목록 가져오기 에러:', error);
                        });
                }
            })
            .catch(error => {
                console.error('댓글 수정 중 에러:', error);
            });
    };

    const handleCommentDelete = (commentId) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=delete&code=${commentId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/diaryComment?command=find&diaryCode=${serverData.code}`)
                        .then(response => response.json())
                        .then(data => {
                            setComments(data);
                        })
                        .catch(error => {
                            console.error('댓글 목록 가져오기 에러:', error);
                        });
                }
            })
            .catch(error => {
                console.error('댓글 삭제 중 에러:', error);
            });
    };

    return (
        <>
            <Box
                p="40px"
                bg="#E0CCB3"
                borderRadius="20px"
                boxShadow="0 12px 24px rgba(0, 0, 0, 0.1)"
                maxW="800px"
                mx="auto"
                textAlign="center"
                mt="40px"
            >
                <Box
                    borderBottom="2px solid #ccc"
                    pb="30px"
                    mb="30px"
                >
                    <Heading color="#333" fontSize="32px" fontWeight="700" textTransform="uppercase" letterSpacing="2px">
                        {serverData.date}일의 다이어리({serverData.category})
                        {console.log(serverData)}
                    </Heading>
                    <Box
                        borderBottom="2px solid #ccc"
                        pb="30px"
                        mb="30px"
                    ></Box>
                    <Heading color="#333" fontSize="32px" fontWeight="700" textTransform="uppercase" letterSpacing="2px">
                        {serverData.title}
                    </Heading>
                </Box>
                {serverData.imgUrl && (
                    <Box
                        borderBottom="2px solid #ccc"
                        pb="30px"
                        mb="30px"
                    >
                        <Flex justifyContent="center">
                            <Image
                                src={serverData.imgUrl}
                                alt="Diary"
                                maxW="600px"
                                borderRadius="20px"
                                boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                                transition="transform 0.4s ease, box-shadow 0.4s ease"
                                _hover={{
                                    transform: 'scale(1.1)',
                                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)'
                                }}
                            />
                        </Flex>
                    </Box>
                )}
                <Box
                    borderBottom="2px solid #ccc"
                    pb="30px"
                    mb="30px"
                >
                    <Text fontSize="20px" color="#666" lineHeight="1.8" px="20px">
                        {serverData.content}
                    </Text>
                </Box>
                <Flex justifyContent="center" gap="20px">
                    {isOwner && (
                        <>
                            <Button
                                onClick={handleEdit}
                                p="15px 30px"
                                borderRadius="30px"
                                fontSize="18px"
                                fontWeight="700"
                                bg="#ffd700"
                                color="#333"
                                boxShadow="0 6px 12px rgba(255, 215, 0, 0.4)"
                                transition="background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease"
                                _hover={{
                                    bg: '#ffcc00',
                                    boxShadow: '0 8px 16px rgba(255, 215, 0, 0.6)',
                                    transform: 'translateY(-2px)'
                                }}
                            >
                                수정하기
                            </Button>
                            <Button
                                onClick={handleDelete}
                                p="15px 30px"
                                borderRadius="30px"
                                fontSize="18px"
                                fontWeight="700"
                                bg="#ff6347"
                                color="#fff"
                                boxShadow="0 6px 12px rgba(255, 99, 71, 0.4)"
                                transition="background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease"
                                _hover={{
                                    bg: '#ff4500',
                                    boxShadow: '0 8px 16px rgba(255, 99, 71, 0.6)',
                                    transform: 'translateY(-2px)'
                                }}
                            >
                                삭제하기
                            </Button>
                        </>
                    )}
                </Flex>

                <Box mt="30px">
                    <Heading fontSize="24px" color="#333" mb="20px">댓글</Heading>
                    {comments.length > 0 && comments[0].status !== 400 ? (
                        comments.map((comment) => (
                            <Box key={comment.code} p="20px" mb="10px" bg="#f9f9f9" borderRadius="10px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
                                <Flex justifyContent="space-between" alignItems="center" mb="5px">
                                    <Text fontSize="14px" color="#777">{`작성자: ${comment.userNickName}`}</Text>
                                    <Text fontSize="14px" color="#777">{`작성시각: ${comment.regDate}`}{comment.regDate !== comment.modDate ? " (수정됨)" : ""}</Text>
                                </Flex>
                                <Text fontSize="16px" color="#777" textAlign="left">{comment.content}</Text>
                                {user.id === comment.userId && (
                                    <Flex justifyContent="flex-end" mt="10px">
                                        <Button size="sm" colorScheme="blue" mr="5px" onClick={() => handleCommentEdit(comment)}>수정</Button>
                                        <Button size="sm" colorScheme="red" onClick={() => handleCommentDelete(comment.code)}>삭제</Button>
                                    </Flex>
                                )}
                            </Box>
                        ))
                    ) : (
                        <Text>현재 글에 등록된 댓글이 없습니다.</Text>
                    )}
                    {/* Comment Form */}
                    <Box mt="30px">
                        <Heading fontSize="20px" color="#333" mb="10px">댓글 추가</Heading>
                        <FormControl>
                            <Textarea
                                placeholder="댓글을 작성해주세요."
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            onClick={handleCommentSubmit}
                            bg={'#AF8F6F'}
                            size="lg"
                            mt="10px"
                            isLoading={isCommentSubmitting}
                        >
                            댓글 작성
                        </Button>
                    </Box>
                </Box>

                <Modal isOpen={isRecordModalOpen} onClose={onRecordModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{serverData.date}일의 다이어리 기록</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>제목</FormLabel>
                                    <Input type="text" name="title" value={diary.title} onChange={handleInputChange} placeholder="제목을 입력하세요" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>내용</FormLabel>
                                    <Textarea name="content" value={diary.content} onChange={handleInputChange} placeholder="내용을 입력하세요" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>타입</FormLabel>
                                    <Select name="category" value={diary.category} onChange={handleInputChange} placeholder="타입 선택">
                                        <option value="출산전">출산전</option>
                                        <option value="출산후">출산후</option>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>이미지 업로드</FormLabel>
                                    <Input type="file" onChange={handleImageChange} accept="image/*" />
                                </FormControl>
                                <Button
                                    onClick={handleButtonClick}
                                    colorScheme="teal"
                                    size="lg"
                                    type="submit"
                                    isLoading={isLoading}
                                    disabled={isLoading}
                                >
                                    저장
                                </Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal isOpen={isCommentEditModalOpen} onClose={onCommentEditModalClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>댓글 수정</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>댓글 내용</FormLabel>
                                    <Textarea value={editCommentInput} onChange={(e) => setEditCommentInput(e.target.value)} placeholder="댓글 내용을 수정하세요" />
                                </FormControl>
                                <Button
                                    onClick={handleCommentUpdate}
                                    bg={'#AF8F6F'}
                                    size="lg"
                                    type="submit"
                                >
                                    저장
                                </Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </>
    );
};

export default DiaryView;