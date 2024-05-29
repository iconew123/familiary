import React, { useState } from 'react';
import { Input, Button, Box, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const Login = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const { loginStatus } = useSession();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    if (loggedIn) {
        navigate('/main');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // 입력 검증
        if (!id | !password) {
            if (!id) {
                setIdError('아이디를 입력하세요.');

            } else if (id) {
                setIdError(false);

            }
            if (!password) {
                setPasswordError('비밀번호를 입력하세요.');

            } else if (password) {
                setPasswordError(false);

            }
            return
        }
        else {
            const formData = new URLSearchParams();
            formData.append('id', id);
            formData.append('password', password);
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });
            if (response.ok) {
                const userData = await response.json();
                console.log('로그인 성공');
                loginStatus(userData);
                navigate('/main');
                console.log(userData);
            } else {
                console.log('로그인 실패');
            }
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
                <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px'>로그인</Text>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={id}
                        id="id"
                        name="id"
                        placeholder="아이디"
                        onChange={(e) => setId(e.target.value)}
                        size='lg' bg='white' w='100%'
                        mb={4}
                    />
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

                    {idError ? <Text color="red">{idError}</Text> : null}
                    {passwordError ? (<Text color="red">{passwordError}</Text>) : null}
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>로그인</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
