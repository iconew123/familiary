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

    const checkDuplicate = async (field, value) => {
        const formData = new URLSearchParams();
        formData.append('field', field);
        formData.append('value', value);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User/checkDuplicate`, {
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

    const handleBlur = async (field, value, setError) => {
        if (value) {
            const isDuplicate = await checkDuplicate(field, value);
            if (isDuplicate) {
                setError(`${field}가 이미 사용 중입니다.`);
            } else {
                setError(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (!password) {
            setPasswordError('비밀번호를 입력하세요.');
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (!newPassword) {
            setNewPasswordError('새로운 비밀번호를 입력하세요.');
        } else {
            setNewPasswordError(flase);
        }

        // 비밀번호가 일치하는지 확인
        if (password !== user.password) {
            setPasswordError('기존 비밀번호가 일치하지 않습니다.');
            hasError = true;
        } else {
            setPasswordError(flase);
        }

        if (nickname) {
            const isDuplicate = await checkDuplicate('nickname', nickname);
            if (isDuplicate) {
                setNicknameError('닉네임이 이미 사용 중입니다.');
                hasError = true;
            } else {
                setNicknameError(false);
            }
        }

        if (phone) {
            const isDuplicate = await checkDuplicate('phone', phone);
            if (isDuplicate) {
                setPhoneError('핸드폰번호가 이미 사용 중입니다.');
                hasError = true;
            } else {
                setPhoneError(false);
            }
        }

        if (email) {
            const isDuplicate = await checkDuplicate('email', email);
            if (isDuplicate) {
                setEmailError('이메일이 이미 사용 중입니다.');
                hasError = true;
            } else {
                setEmailError(false);
            }
        }

        // 에러발생 > 멈춰
        if (hasError) {
            return;
        }

        const formData = new URLSearchParams();
        formData.append('id', user.id);
        formData.append('password', password);
        formData.append('newPassword', newPassword);
        formData.append('newNickname', newNickname || user.nickname);
        formData.append('newTelecom', newTelecom || user.telecom);
        formData.append('newPhone', newPhone || user.phone);
        formData.append('newEmail', newEmail || user.email);
        formData.append('newAddress', newAddress || user.address);

        console.log(userInfo.nickname);

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
                        defaultValue={user.nickname}
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
                        defaultValue={user.telecom}
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
                        defaultValue={user.phone}
                        id="newPhone"
                        name="newPhone"
                        placeholder="핸드폰번호"
                        onChange={(e) => setNewPhone(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="email"
                        defaultValue={user.email}
                        id="newEmail"
                        name="newEmail"
                        placeholder="이메일"
                        onChange={(e) => setNewEmail(e.target.value)}
                        size='lg' bg='white' w='100%'
                        marginBottom='10px'
                    />
                    <Input
                        type="text"
                        defaultValue={user.address}
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