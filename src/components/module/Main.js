import { Box, Grid, GridItem, Image, Link, Text, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import adImage1 from '../image/ad1.jpg';
import adImage2 from '../image/ad2.jpg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!id || !password) {
            if (!id) {
                setIdError('아이디를 입력하세요.');
            } else {
                setIdError('');
            }

            if (!password) {
                setPasswordError('비밀번호를 입력하세요.');
            } else {
                setPasswordError('');
            }
            return;
        }

        const formData = new URLSearchParams();
        formData.append('id', id);
        formData.append('password', password);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/User?command=login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            if (response.ok) {
                const userData = await response.json();
                if (userData.status === 200) {
                    console.log('로그인 성공');
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userInfo', JSON.stringify(userData));
                    navigate(0); // 페이지 새로고침
                } else {
                    console.log('로그인 실패:', userData.message);
                    setPasswordError('아이디 또는 비밀번호가 잘못되었습니다.');
                }
            } else {
                console.log('로그인 요청 실패');
                setPasswordError('서버 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('로그인 요청 중 에러 발생:', error);
            setPasswordError('네트워크 오류가 발생했습니다.');
        }
    };

    return (
        <Grid
            h='auto'
            templateAreas={`"adArea board board login"
                        "adArea ideology ideology adArea2"`}
            gridTemplateColumns={'1fr 1fr 1fr 1fr'}
            gap={1}
        >
            {/* 광고단 */}
            <GridItem w='100%' area={'adArea'} display="flex" justifyContent="center" alignItems="center">
                <Link href="https://www.gg.go.kr/contents/contents.do?ciIdx=987110&menuId=266074">
                    <Image src={adImage1} alt="ad Image" width="100%" height="100%" objectFit="cover" />
                </Link>
            </GridItem>

            {/* 임산부 가이드 */}
            <GridItem w='100%' bg='#E4CBAB' area={'ideology'}>
                아이가 없는 사람들도 자유롭게 사용이 가능한 사이트
            </GridItem>

            {/* 로그인 */}
            <GridItem w='100%' bg='white' area={'login'} rowSpan={1}>
                {!loggedIn ? (
                    <Box maxW='500px' mx='auto' textAlign='center'>
                        <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px'>로그인</Text>
                        <form onSubmit={handleLogin}>
                            <Input
                                type="text"
                                value={id}
                                id="id"
                                name="id"
                                placeholder="아이디"
                                onChange={(e) => setId(e.target.value)}
                                size='lg'
                                bg='white'
                                w='100%'
                                mb={4}
                            />
                            {idError && <Text color="red">{idError}</Text>}
                            <Input
                                type="password"
                                value={password}
                                id="password"
                                name="password"
                                placeholder="비밀번호"
                                onChange={(e) => setPassword(e.target.value)}
                                size='lg'
                                bg='white'
                                w='100%'
                                mb={4}
                            />
                            {passwordError && <Text color="red">{passwordError}</Text>}
                            <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }}>
                                로그인
                            </Button>
                        </form>
                    </Box>
                ) : (
                    <Box marginLeft='10px'>
                        <Text fontSize="2xl" fontWeight="bold" mb="20px">
                            {user.id}님의 회원 정보
                        </Text>
                        <Text fontSize="xl">
                            닉네임: {user.nickname}
                        </Text>
                        <Text fontSize="xl">
                            이름: {user.name}
                        </Text>
                    </Box>
                )}
            </GridItem>

            {/* 광고단2 */}
            <GridItem w='100%' h='55px' area={'adArea2'} rowSpan={3} display="flex" justifyContent="center" alignItems="center">
                <Link href="https://kidikidi.elandmall.co.kr/p/planshop?exhibitionNo=202309008823">
                    <Image src={adImage2} alt="ad Image2" width="100%" height="100%" objectFit="cover" />
                </Link>
            </GridItem>

            {/* 게시판(최신순) */}
            <GridItem w='100%' bg='#E6D7C3' area={'board'}>
                게시판(최신순)
            </GridItem>
        </Grid>
    );
};

export default Main;