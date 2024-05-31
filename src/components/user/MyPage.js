import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const MyPage = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);
    const navigate = useNavigate();
    const { isLoggedIn } = useSession();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);


    const handleUpdate = () => {
        navigate('/user/update');
    };

    const handleDelete = () => {
        navigate('/user/delete');
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            h="50vh"
            bg='#fffbf0'
            p="40px"
            borderRadius="8px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
            {loggedIn ? <Box bg="white" p="40px" borderRadius="8px" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" mb="20px" textAlign="center">
                <Text fontSize="2xl" fontWeight="bold" mb="20px">
                    {user.id}님의 회원 정보
                </Text>
                <Text fontSize="xl">
                    닉네임 {user.nickname}
                </Text>
                <Text fontSize="xl">
                    이름 {user.name}
                </Text>
            </Box> : null}


            <Flex mt="20px">
                <Button
                    onClick={handleUpdate}
                    w='100px'
                    bg='#e0ccb3'
                    mr='10px'
                    _hover={{ color: '#fffbf0' }}
                >
                    회원정보수정
                </Button>
                <Button
                    onClick={handleDelete}
                    w='100px'
                    bg='#e0ccb3'
                    _hover={{ color: '#fffbf0' }}
                >
                    회원 탈퇴
                </Button>
            </Flex>
        </Box>
    );
};

export default MyPage;