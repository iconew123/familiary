import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDiaryDetailInfo } from './DiaryMain';
import { Box, Button, Image, Heading, Text, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, FormControl, FormLabel, Input, Textarea, useDisclosure, Select } from '@chakra-ui/react';

const DiaryView = () => {
    const { date, babycode } = useParams();
    const navigate = useNavigate();
    const [serverData, setServerData] = useState();
    const { isOpen: isRecordModalOpen, onOpen: onRecordModalOpen, onClose: onRecordModalClose } = useDisclosure();

    useEffect(() => {
        console.log("baby_code" + babycode);
        console.log("date" + date);
        fetchDiaryDetailInfo(date, babycode).then(response => {
            setServerData(response);
        });
    }, [date, babycode]);

    const [diary, setdiary] = useState({
        title: '',
        content: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name : " + name);
        console.log("value : " + value);
        setdiary(prevState => ({
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
    };

    const handleDelete = () => {
        console.log("serverData.baby_code" + serverData.baby_code);
        console.log("serverData.date" + serverData.date);
        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=delete&babycode=${serverData.baby_code}&date=${serverData.date}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
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

    return (
        <>
            <Box
                p="40px"
                bg="rgb(255, 208, 208)"
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
                </Flex>
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
            </Box>
        </>
    );
};

export default DiaryView;
