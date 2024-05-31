import { Box, Button, Text, Input, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const UserUpdate = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newNickname, setNewNickname] = useState('');
    const [newTelecom, setNewTelecom] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const { isLoggedIn, userInfo, loginStatus } = useSession();
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password || !newPassword) {
            if (!password) {
                setPasswordError('기존 비밀번호를 입력하세요.');
            } else {
                setPasswordError('');
            }

            if (!newPassword) {
                setNewPasswordError('새로운 비밀번호를 입력하세요.');
            } else {
                setNewPasswordError('');
            }

            return;
        }

        // 비밀번호가 일치하는지 확인
        if (password !== user.password) {
            setPasswordError('기존 비밀번호가 일치하지 않습니다.');
            return;
        } else {
            setPasswordError('');
        }

        const formData = new URLSearchParams();
        formData.append('id', user.id); 
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        formData.append('newNickname', newNickname || userInfo.nickname);
        formData.append('newTelecom', newTelecom || userInfo.telecom);
        formData.append('newPhone', newPhone || userInfo.phone);
        formData.append('newEmail', newEmail || userInfo.email);
        formData.append('newAddress', newAddress || userInfo.address);

        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            if (response.ok) {
                const userData = await response.json();
                console.log('회원정보 변경 성공');
                loginStatus(userData);
                navigate('/user/myPage');
            } else {
                const errorData = await response.json();
                console.log('회원정보 변경 실패', errorData);
            }
        } catch (error) {
            console.error('회원정보변경 요청 중 에러 발생:', error);
        }
    };

    return (
        <Box
            bg='#fffbf0'
            h='auto'
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection='column'
            textAlign='center'
        >
            <Box maxW='500px'>
                <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px'>회원정보수정</Text>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="password"
                        value={password}
                        id="password"
                        name="password"
                        placeholder="기존 비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    
                    <Input
                        type="password"
                        value={newPassword}
                        id="newPassword"
                        name="newPassword"
                        placeholder="새로운 비밀번호"
                        onChange={(e) => setNewPassword(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />

                    <Input
                        type="text"
                        value={newNickname}
                        id="newNickname"
                        name="newNickname"
                        placeholder="닉네임"
                        onChange={(e) => setNewNickname(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Select
                        id="newTelecom"
                        name="newTelecom"
                        value={newTelecom}
                        onChange={(e) => setNewTelecom(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    >
                        <option value="" disabled>통신사 선택</option>
                        <option value="skt">SKT</option>
                        <option value="kt">KT</option>
                        <option value="lgt">LGU+</option>
                    </Select>
                    <Input
                        type="text"
                        value={newPhone}
                        id="newPhone"
                        name="newPhone"
                        placeholder="핸드폰번호"
                        onChange={(e) => setNewPhone(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="email"
                        value={newEmail}
                        id="newEmail"
                        name="newEmail"
                        placeholder="이메일"
                        onChange={(e) => setNewEmail(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="text"
                        value={newAddress}
                        id="newAddress"
                        name="newAddress"
                        placeholder="주소"
                        onChange={(e) => setNewAddress(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    {serverError && <Text color="red">{serverError}</Text>}
                    {passwordError && <Text color="red">{passwordError}</Text>}
                    {newPasswordError && <Text color="red">{newPasswordError}</Text>}
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원정보수정</Button>
                </form>
            </Box>
        </Box>
    );
};

export default UserUpdate;