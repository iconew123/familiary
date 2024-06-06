import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInfoDetail } from '../DiaryMain';
import { Box, Button, Heading, Text, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, FormControl, FormLabel, Textarea, useDisclosure } from '@chakra-ui/react';

const BabyInfoView = () => {
    const { date, babycode, id } = useParams();
    const navigate = useNavigate();
    const [serverInfoData, setServerInfoData] = useState();
    const { isOpen: isRecordModalOpen, onOpen: onRecordModalOpen, onClose: onRecordModalClose } = useDisclosure();

    useEffect(() => {
        fetchInfoDetail(date, babycode).then(response => {
            setServerInfoData(response);
        });
    }, [date, babycode]);

    const [info, setInfo] = useState({
        height: '',
        weight: '',
        memo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = () => {
        setIsLoading(true);

        if (!info.height && !info.weight) {
            alert("키와 몸무게를 적어주세요.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('date', serverInfoData.date);
        formData.append('baby_code', serverInfoData.baby_code);
        formData.append('height', info.height);
        formData.append('weight', info.weight);
        formData.append('spec_note', info.memo);

        fetch(`${process.env.REACT_APP_SERVER_URL}/babyInfo?command=update`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    onRecordModalClose();

                    fetchInfoDetail(serverInfoData.date, serverInfoData.baby_code)
                        .then(data => {
                            setServerInfoData(data);
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
        if (serverInfoData) {
            setInfo({
                height: serverInfoData.height || '',
                weight: serverInfoData.weight || '',
                spec_note: serverInfoData.spec_note || ''
            });
        }
    };

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/babyInfo?command=delete&baby_code=${serverInfoData.baby_code}&date=${serverInfoData.date}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    alert("정보 삭제 성공");
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

    if (!serverInfoData) {
        return <Box textAlign="center" fontSize="22px" color="#333" mt="40px">Loading...</Box>;
    }

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
                        {serverInfoData.date}
                    </Heading>
                </Box>

                <Box
                    borderBottom="2px solid #ccc"
                    pb="30px"
                    mb="30px"
                >
                    <Text fontSize="20px" color="#666" lineHeight="1.8" px="20px">
                        키 | {serverInfoData.height}cm
                    </Text>
                    <Text fontSize="20px" color="#666" lineHeight="1.8" px="20px">
                        몸무게 | {serverInfoData.weight}kg
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
                        <ModalHeader>{serverInfoData.date}일의 정보 기록</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <FormControl isRequired>
                                    <FormLabel>키</FormLabel>
                                    <Textarea name="height" value={info.height} onChange={handleInputChange} placeholder="키를 입력하세요" />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>몸무게</FormLabel>
                                    <Textarea name="weight" value={info.weight} onChange={handleInputChange} placeholder="몸무게를 입력하세요" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>메모</FormLabel>
                                    <Textarea name="spec_note" value={info.spec_note} onChange={handleInputChange} placeholder="메모" />
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

export default BabyInfoView;