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
    const [newAdress, setNewAdress] = useState('');
    const { isLoggedIn } = useSession();

    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/main');
        }
    }, [isLoggedIn, navigate]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new URLSearchParams();
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        formData.append('newNickname', newNickname);
        formData.append('newTelecom', newTelecom);
        formData.append('newTelecom', newTelecom);
        formData.append('newEmail', newEmail);
        formData.append('newAdress', newAdress);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            if (response.ok) {
                console.log('데이터 전송 성공');
                navigate('/user/myPage');
            } else {
                const errorData = await response.json();
                console.log('데이터 전송 실패', errorData);
            }
        } catch (error) {
            console.error('네트워크 오류', error);
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
            textAlign='center'>

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
                    />
                    <Input
                        type="newPassword"
                        value={newPassword}
                        id="newPassword"
                        name="newPassword"
                        placeholder="새로운 비밀번호"
                        onChange={(e) => setNewPassword(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={newNickname}
                        id="newNickname"
                        name="newNickname"
                        placeholder="닉네임"
                        onChange={(e) => setNewNickname(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Select
                        id="newTelecom"
                        name="newTelecom"
                        value={newTelecom}
                        onChange={(e) => setNewTelecom(e.target.value)}
                        size='lg' bg='white' w='100%'
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
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
                    />
                    <Input
                        type="newEmail"
                        value={newEmail}
                        id="newEmail"
                        name="newEmail"
                        placeholder="이메일"
                        onChange={(e) => setNewEmail(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={newAdress}
                        id="newAdress"
                        name="newAdress"
                        placeholder="주소"
                        onChange={(e) => setNewAdress(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원정보수정</Button>
                </form>
            </Box>


        </Box>
    );
};

export default UserUpdate;