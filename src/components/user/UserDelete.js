import { Input, Button, Box, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent'; 

const UserDelete = () => {
    const { logoutStatus } = useSession();
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);
    const { isLoggedIn } = useSession();


    useEffect(() => {

        if (!loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('id', user);
        formData.append('password', password);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                mode: 'cors'
            });
            if (response.ok) {
                console.log('회원 탈퇴 성공');
                logoutStatus();
                navigate('/main');
            } else {
                console.log('회원 탈퇴 실패');
            }
    
        } catch (error) {
            console.error('회원탈퇴 요청 중 에러 발생:', error);
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
