import { Input, Button, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const UserDelete = () => {
    const { logoutStatus, isLoggedIn } = useSession();
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [serverError, setServerError] = useState('');

    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {

        if (!loggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        const formData = new URLSearchParams();

        formData.append('id', user.id);
        formData.append('password', password);
        console.log(user.id);
        console.log(user.password);
        try {

            if (!password) {
                setPasswordError('비밀번호를 입력하세요.');
                return;
            } else {
                setPasswordError('');
            }

            // 비밀번호가 일치하는지 확인
            if (password !== user.password) {
                setPasswordError('기존 비밀번호가 일치하지 않습니다.');
                return;
            } else {
                setPasswordError('');
            }

            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });
            if (response.ok) {
                console.log('회원 탈퇴 성공');
                logoutStatus();
                navigate('/');
            } else {
                console.log('회원 탈퇴 실패');
            }

        } catch (error) {
            console.error('회원탈퇴 요청 중 에러 발생:', error);
        }
    };

    const [data, setData] = useState({});

    const handleCheckClick = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=checkDeleteBaby&user_id=${user.id}`)
        .then(response => response.json())
        .then(data => {

            if(data.isExist){
                onOpen();  // 모달창 호출
            } else {
                handleSubmit();
            }
            
        })
        .catch(error => {
            console.error('데이터를 가져오는 중 에러 발생', error);
        });
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
                    {serverError && <Text color="red">{serverError}</Text>}
                    {passwordError && <Text color="red">{passwordError}</Text>}
                    <Button onClick={() => handleCheckClick()} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>회원탈퇴</Button>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>탈퇴 불가</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>연결된 아기정보를 삭제해주세요.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg='#e0ccb3' _hover={{ color: '#fffbf0' }} mr={3} onClick={onClose}>
                            닫기
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
    );
};

export default UserDelete;
