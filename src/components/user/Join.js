import { Box, Button, Text, Input, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';



const Join = () => {
    
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [securityNumber, setSecurityNumber] = useState('');
    const [telecom, setTelecom] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [securityNumberError, setSecurityNumberError] = useState(false);
    const [telecomError, setTelecomError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const { isLoggedIn} = useSession();
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!id | !password | !nickname | !name | !securityNumber | !telecom | !phone) {
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
            if (!nickname) {
                setNicknameError('닉네임을 입력하세요.');
            } else if (nickname) {
                setNicknameError(false);
            }
            if (!name) {
                setNameError('이름을 입력하세요.');
            } else if (name) {
                setNameError(false);
            }
            if (!securityNumber) {
                setSecurityNumberError('주민번호를 입력하세요.');
            } else if (securityNumber) {
                setSecurityNumberError(false);
            }
            if (!telecom) {
                setTelecomError('통신사를 선택해주세요');
            } else if (telecom) {
                setTelecomError(false);
            }
            if (!phone) {
                setPhoneError('핸드폰번호를 입력하세요.');
            } else if (phone) {
                setPhoneError(false);
            }
            return
        }
        else {

            const formData = new URLSearchParams();
            formData.append('id', id);
            formData.append('password', password);
            formData.append('nickname', nickname);
            formData.append('name', name);
            formData.append('securityNumber', securityNumber);
            formData.append('telecom', telecom);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('address', address);

            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData
                });

                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate('/user/login');
                } else {
                    const errorData = await response.json();
                    console.log('데이터 전송 실패', errorData);
                }
            } catch (error) {
                console.error('네트워크 오류', error);
            }
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
                <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px'>회원가입</Text>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={id}
                        name="id"
                        placeholder="아이디"
                        onChange={(e) => setId(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="password"
                        value={password}
                        id="password"
                        name="password"
                        placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={nickname}
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임"
                        onChange={(e) => setNickname(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={name}
                        id="name"
                        name="name"
                        placeholder="이름"
                        onChange={(e) => setName(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={securityNumber}
                        id="securityNumber"
                        name="securityNumber"
                        placeholder="주민등록번호"
                        onChange={(e) => setSecurityNumber(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Select
                        id="telecom"
                        name="telecom"
                        value={telecom}
                        onChange={(e) => setTelecom(e.target.value)}
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
                        value={phone}
                        id="phone"
                        name="phone"
                        placeholder="핸드폰번호"
                        onChange={(e) => setPhone(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="email"
                        value={email}
                        id="email"
                        name="email"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    <Input
                        type="text"
                        value={address}
                        id="address"
                        name="address"
                        placeholder="주소"
                        onChange={(e) => setAddress(e.target.value)}
                        size='lg' bg='white' w='100%'
                    />
                    {idError ? <Text color="red">{idError}</Text> : null}
                    {passwordError ? (<Text color="red">{passwordError}</Text>) : null}
                    {nicknameError ? (<Text color="red">{nicknameError}</Text>) : null}
                    {nameError ? (<Text color="red">{nameError}</Text>) : null}
                    {securityNumberError ? (<Text color="red">{securityNumberError}</Text>) : null}
                    {telecomError ? (<Text color="red">{telecomError}</Text>) : null}
                    {phoneError ? (<Text color="red">{phoneError}</Text>) : null}
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원가입</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Join;