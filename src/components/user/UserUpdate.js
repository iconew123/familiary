import { Box, Button, Text, Input, Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const UserUpdate = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [telecom, setTelecom] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [nicknameDuplError, setNicknameDuplError] = useState(false);
    const [phoneDuplError, setPhoneDuplError] = useState(false);
    const [emailDuplError, setEmailDuplError] = useState(false);

    const [loading, setLoading] = useState(false);
    const { isLoggedIn, loginStatus } = useSession();
    const navigate = useNavigate();
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

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

    const checkPassword = async (password) => {
        const formData = new URLSearchParams();
        formData.append('id', user.id);
        formData.append('password', password);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=verifyPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });
            const data = await response.json();
            return data.isVerity;
        } catch (error) {
            console.error('네트워크 오류', error);
            return false;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        let hasError = false;


        if (!password) {
            setPasswordError('비밀번호를 입력하세요.');
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (!newPassword) {
            setNewPasswordError('새로운 비밀번호를 입력하세요.');
            hasError = true;
        } else {
            setNewPasswordError(false);
        }


        if (password) {
            const isVerity = await checkPassword(password);
            if (!isVerity) {
                setPasswordError("비밀번호가 일치하지 않습니다.");
                hasError = true;
            }
            else {
                setPasswordError(false);
            }
            console.log(isVerity);
        }


        if (nickname) {
            const isDuplicate = await checkDuplicate('nickname', nickname);
            if (isDuplicate) {
                setNicknameDuplError('닉네임이 이미 사용 중입니다.');
                hasError = true;
            } else {
                setNicknameDuplError(false);
            }
        }

        if (phone) {
            const isDuplicate = await checkDuplicate('phone', phone);
            if (isDuplicate) {
                setPhoneDuplError('핸드폰번호가 이미 사용 중입니다.');
                hasError = true;
            } else {
                setPhoneDuplError(false);
            }
        }

        if (email) {
            const isDuplicate = await checkDuplicate('email', email);
            if (isDuplicate) {
                setEmailDuplError('이메일이 이미 사용 중입니다.');
                hasError = true;
            } else {
                setEmailDuplError(false);
            }
        }

        if (hasError) {
            setLoading(false);
            return;
        }

        const formData = new URLSearchParams();
        formData.append('id', user.id);
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        formData.append('nickname', nickname || user.nickname);
        formData.append('telecom', telecom || user.telecom);
        formData.append('phone', phone || user.phone);
        formData.append('address', address || user.address);
        formData.append('email', email || user.email);


        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (response.ok) {
                const userData = await response.json();
                if (userData.status === 200) {
                    console.log('회원 정보 변경 성공');
                    loginStatus(userData);
                    navigate('/user/myPage');
                } else {
                    console.log('회원 정보 변경 실패:', userData.message);
                }
            } else {
                console.log('회원 정보 변경 요청 실패');
                setPasswordError('서버 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('회원 정보 변경 요청 중 에러 발생:', error);
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
                        defaultValue={user.nickname}
                        id="nickname"
                        name="nickname"
                        placeholder="닉네임"
                        onChange={(e) => setNickname(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Select
                        id="telecom"
                        name="telecom"
                        defaultValue={user.telecom}
                        onChange={(e) => setTelecom(e.target.value)}
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
                        defaultValue={user.phone}
                        id="phone"
                        name="phone"
                        placeholder="핸드폰번호"
                        onChange={(e) => setPhone(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="text"
                        defaultValue={user.address}
                        id="address"
                        name="address"
                        placeholder="주소"
                        onChange={(e) => setAddress(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="text"
                        defaultValue={user.email}
                        id="email"
                        name="email"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />


                    {passwordError && <Text color="red">{passwordError}</Text>}
                    {newPasswordError && <Text color="red">{newPasswordError}</Text>}
                    {nicknameDuplError && <Text color="red">{nicknameDuplError}</Text>}
                    {phoneDuplError && <Text color="red">{phoneDuplError}</Text>}
                    {emailDuplError && <Text color="red">{emailDuplError}</Text>}
                    <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원정보수정</Button>
                </form>
            </Box>
        </Box>
    );
};

export default UserUpdate;