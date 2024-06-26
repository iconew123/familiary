import { Box, Grid, GridItem, Image, Link, Text, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import adImage1 from '../image/ad1.jpg';
import adImage2 from '../image/ad2.jpg';
import info1 from '../image/info1.jpg'
import info2 from '../image/info2.jpg'
import info3 from '../image/info3.jpg'
import info4 from '../image/info4.jpg'
import info5 from '../image/info5.jpg'
import info6 from '../image/info6.jpg'
import info7 from '../image/info7.jpg'
import info8 from '../image/info8.jpg'


import { useNavigate } from 'react-router-dom';

const Main = () => {
    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [idError, setIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [latestPosts, setLatestPosts] = useState([]);
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
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userInfo', JSON.stringify(userData));
                    navigate(0); 
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

    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/main`);
                if (response.ok) {
                    const data = await response.json();
                    const processedPosts = data.map(post => ({
                        ...post,
                        koreanCategory: post.category === 'chat' ? '자유' : post.category === 'notice' ? '공지' : post.category === 'recommend' ? '추천' : post.category
                    }));
                    setLatestPosts(processedPosts);
                } else {
                    console.error('최신 글 가져오기 실패');
                }
            } catch (error) {
                console.error('최신 글 가져오는 중 에러 발생:', error);
            }
        };
        fetchLatestPosts();
    }, []);

    const noticePost = latestPosts.find(post => post.category === 'notice');
    const otherPosts = latestPosts.filter(post => post.category !== 'notice').slice(0, 3);

    return (
        <Box padding="20px">
            <Grid
                h='auto'
                templateAreas={`"adArea info info login"
                            "adArea info info adArea2"
                            "adArea board board adArea2"`}
                gridTemplateColumns={'1fr 1fr 1fr 1fr'}
                gridTemplateRows={'auto 1fr 1fr'}
                gap={6}
            >
                <GridItem w='100%' area={'adArea'} display="flex" justifyContent="center" alignItems="center" padding={4}>
                    <Link href="https://www.gg.go.kr/contents/contents.do?ciIdx=987110&menuId=266074">
                        <Image src={adImage1} alt="ad Image" width="100%" height="100%" objectFit="cover" />
                    </Link>
                </GridItem>

                <GridItem area={'info'} padding={4} rowSpan={2} display="flex" flexDirection="column" justifyContent="space-between">
                    <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(2, 1fr)" gap={6} height="100%">
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info1} alt="Image 1" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">임신초기 이상 증상 확인</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info2} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">임신초기 입덧 관리 </Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info3} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">임신 중기 임신중독증 진단</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info4} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">임신 말기 조기진통 숙지</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info5} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">가다실 예방 접종 권장</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info7} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">임산부 신고</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info6} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">산후 우울증 진단 및 치료</Text>
                        </GridItem>
                        <GridItem colSpan={1} rowSpan={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Image src={info8} alt="info Image" width="100%" height="200px" objectFit="cover" />
                            <Text fontSize='sm' fontFamily="'Nanum Gothic', cursive">아이 돌봄교실 신청</Text>
                        </GridItem>

                    </Grid>
                </GridItem>

                <GridItem w='100%' bg='white' area={'login'} padding={4} rowSpan={1}>
                    {!loggedIn ? (
                        <Box maxW='500px' mx='auto' textAlign='center'>
                            <Text fontSize='5xl' as='b' color='#765d2f' marginBottom='30px' fontFamily="'Nanum Gothic', cursive">로그인</Text>
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
                                {idError && <Text fontFamily="'Nanum Gothic', cursive" color="red">{idError}</Text>}
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
                                <Button type="submit" w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">
                                    로그인
                                </Button>
                            </form>
                        </Box>
                    ) : (
                        <Box marginLeft='10px'>
                            <Text fontSize="2xl" fontWeight="bold" mb="20px" fontFamily="'Nanum Gothic', cursive">
                                {user.id}님의 회원 정보
                            </Text>
                            <Text fontSize="xl" fontFamily="'Nanum Gothic', cursive">
                                닉네임: {user.nickname}
                            </Text>
                            <Text fontSize="xl" fontFamily="'Nanum Gothic', cursive">
                                이름: {user.name}
                            </Text>
                        </Box>
                    )}
                </GridItem>
                
                <GridItem w='100%' bg='#fffbf0' area={'board'} padding={4} rowSpan={2}>
                    <Text fontSize="2xl" fontWeight="bold" mb="20px" fontFamily="'Nanum Gothic', cursive">
                        최신 글 목록
                    </Text>
                    <Box>
                        <Box>
                            {noticePost && (
                                <Box key={noticePost.code} mb="20px">
                                    <Text fontFamily="'Nanum Gothic', cursive" fontSize="lg">공지 | {noticePost.title}</Text>
                                </Box>
                            )}
                            {otherPosts && otherPosts.length > 0 ? (
                                otherPosts.map(post => (
                                    <Box key={post.code} mb="20px">
                                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="lg">{post.koreanCategory} | {post.title}</Text>
                                    </Box>
                                ))
                            ) : (
                                <Text fontFamily="'Nanum Gothic', cursive">최신 게시물이 없습니다.</Text>
                            )}
                        </Box>
                    </Box>
                </GridItem>

                <GridItem w='100%' h='55px' area={'adArea2'} justifyContent="center" alignItems="center">
                    <Link href="https://youtu.be/vXXHdzikJz4?si=28AQ0sXwFBam8RD1" ><Image src={adImage2} alt="ad Image2" width="100%"  /></Link>
                </GridItem>

            </Grid>
        </Box>
    );
};

export default Main;