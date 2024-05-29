import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    if (!loggedIn) {
        navigate('/user/login');
        return;
    }

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
        >
            <Button
                onClick={handleUpdate}
                w='100px'
                bg='#e0ccb3'
                marginTop='40px'
                _hover={{ color: '#fffbf0' }}
            >
                회원정보수정
            </Button>
            <Button
                onClick={handleDelete}
                w='100px'
                bg='#e0ccb3'
                marginTop='40px'
                _hover={{ color: '#fffbf0' }}
            >
                회원 탈퇴
            </Button>
        </Box>
    );
};

export default MyPage;