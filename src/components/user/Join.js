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

    const [idDuplError, setIdDuplError] = useState(false);
    const [nicknameDuplError, setNicknameDuplError] = useState(false);
    const [phoneDuplError, setPhoneDuplError] = useState(false);
    const [emailDuplError, setEmailDuplError] = useState(false);

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSession();
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        setLoading(true);
        let hasError = false;

        const checkDuplicate = async (field, value) => {
            const formData = new URLSearchParams();
            formData.append('field', field);
            formData.append('value', value);
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=checkDuplicate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData
                });
                const data = await response.json();
                return data.isDuplicate;
            } catch (error) {
                console.error('네트워크 오류', error);
                return false;
            }
        };

        if (!id) {
            setIdError('아이디를 입력하세요.');
            hasError = true;
        } else {
            setIdError(false);
        }

        if (!password) {
            setPasswordError('비밀번호를 입력하세요.');
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (!nickname) {
            setNicknameError('닉네임을 입력하세요.');
            hasError = true;
        } else {
            setNicknameError(false);
        }

        if (!name) {
            setNameError('이름을 입력하세요.');
            hasError = true;
        } else {
            setNameError(false);
        }

        if (!securityNumber) {
            setSecurityNumberError('주민번호를 입력하세요.');
            hasError = true;
        } else {
            setSecurityNumberError(false);
        }

        if (!telecom) {
            setTelecomError('통신사를 선택해주세요');
            hasError = true;
        } else {
            setTelecomError(false);
        }

        if (!phone) {
            setPhoneError('핸드폰번호를 입력하세요.');
            hasError = true;
        } else {
            setPhoneError(false);
        }

        // 중복확인
        if (!hasError) {
            const idDuplicate = await checkDuplicate('id', id);
            if (idDuplicate) {
                setIdDuplError('아이디가 이미 사용 중입니다.');
                hasError = true;
            } else {
                setIdDuplError(false);
            }

            const nicknameDuplicate = await checkDuplicate('nickname', nickname);
            if (nicknameDuplicate) {
                setNicknameDuplError('닉네임이 이미 사용 중입니다.');
                hasError = true;
            } else {
                setNicknameDuplError(false);
            }

            const phoneDuplicate = await checkDuplicate('phone', phone);
            if (phoneDuplicate) {
                setPhoneDuplError('핸드폰번호가 이미 사용 중입니다.');
                hasError = true;
            } else {
                setPhoneDuplError(false);
            }

            if (email) {
                const emailDuplicate = await checkDuplicate('email', email);
                if (emailDuplicate) {
                    setEmailDuplError('이메일이 이미 사용 중입니다.');
                    hasError = true;
                } else {
                    setEmailDuplError(false);
                }
            }
        }

        // 에러 발생 시 제출 중단
        if (hasError) {
            setLoading(false);
            return;
        }

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
                body: formData.toString()
            });

            if (response.ok) {
                const userData = await response.json();
                if (userData.status === 200) {
                    console.log('회원가입 성공');
                    loginStatus(userData);
                    navigate('/myPage');
                } else {
                    console.log('회원가입 실패:', userData.message);
                }
            } else {
                console.log('회원가입 요청 실패');
                setPasswordError('서버 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('회원가입 요청 중 에러 발생:', error);
            setPasswordError('네트워크 오류가 발생했습니다.');
        } finally {
            setLoading(false);
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
                        type="text"
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
                    {idError && <Text color="red">{idError}</Text>}
                    {idDuplError && <Text color="red">{idDuplError}</Text>}
                    {passwordError && <Text color="red">{passwordError}</Text>}
                    {nicknameError && <Text color="red">{nicknameError}</Text>}
                    {nicknameDuplError && <Text color="red">{nicknameDuplError}</Text>}
                    {nameError && <Text color="red">{nameError}</Text>}
                    {securityNumberError && <Text color="red">{securityNumberError}</Text>}
                    {telecomError && <Text color="red">{telecomError}</Text>}
                    {phoneError && <Text color="red">{phoneError}</Text>}
                    {phoneDuplError && <Text color="red">{phoneDuplError}</Text>}
                    {emailDuplError && <Text color="red">{emailDuplError}</Text>}
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} isLoading={loading}>회원가입</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Join;