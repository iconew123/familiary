import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming React Router v6
import { fetchDiaryDetailInfo } from './DiaryMain';
import { Box, Button, Image, Heading, Text, Flex } from '@chakra-ui/react';

const DiaryView = () => {
    const { date } = useParams();
    const navigate = useNavigate();
    const [serverData, setServerData] = useState();

    useEffect(() => {
        fetchDiaryDetailInfo(date).then(response => {
            setServerData(response);
        });
    }, [date]);

    const handleEdit = () => {
        // 수정 기능 구현
    };

    const handleDelete = () => {
        console.log("serverData.baby_code" +serverData.baby_code);
        console.log("serverData.date" + serverData.date)
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
            <Heading color="#333" fontSize="32px" fontWeight="700" mb="30px" textTransform="uppercase" letterSpacing="2px">
                {serverData.title}
            </Heading>
            <Flex justifyContent="center" mb="30px">
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
            <Text fontSize="20px" color="#666" mb="30px" lineHeight="1.8" px="20px">
                {serverData.content}
            </Text>
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
        </Box>
    );
};

export default DiaryView;
