import { Input, Button, Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent'; 

const UserDelete = () => {
    const { loginStatus } = useSession();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');


    if (!loggedIn) {
        navigate('/user/login');
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('password', password);
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        });
        if (response.ok) {
            console.log('회원 탈퇴 성공');
            loginStatus();
            navigate('/main');
        } else {
            console.log('회원 탈퇴 실패');
        }
    };

    return (
        <Box
            bg='#fffbf0'
            h='50vh'
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign='center'>
            <Box maxW='500px'>
                <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px'>회원탈퇴</Text>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        value={password}
                        id="password"
                        name="password"
                        placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                        size='lg' bg='white' w='100%'
                        mb={4}
                    />
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원탈퇴</Button>
                </form>
            </Box>
        </Box>
    );
};

export default UserDelete;
