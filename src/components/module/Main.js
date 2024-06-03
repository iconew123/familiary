import { Box, Grid, GridItem, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import adImage1 from '../image/ad1.jpg';
import adImage2 from '../image/ad2.jpg';

const Main = () => {
    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };


    const loggedIn = sessionStorage.getItem('isLoggedIn');
    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');

    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);

    console.log('홈2'
    )
    return (
        <>

            <Grid
                h='100vh'
                templateAreas={`"adArea hospital guide login"
                                "adArea board board adArea2"`}
                gridTemplateColumns={'1fr 1fr 1fr 1fr'}
                gap={1}>

                {/* 광고단 */}
                <GridItem w='100%' area={'adArea'} display="flex" justifyContent="center" alignItems="center">
                    <Link href="https://www.gg.go.kr/contents/contents.do?ciIdx=987110&menuId=266074"><Image src={adImage1} alt="ad Image" width="100%" height="100%" objectFit="cover" /></Link>
                </GridItem>

                {/* 병원 정보 */}
                <GridItem w='100%' bg='#E3D2AA' area={'hospital'}>
                    병원INFO
                </GridItem>

                {/* 임산부 가이드 */}
                <GridItem w='100%' bg='#E4CBAB' area={'guide'}>
                    임산부 가이드
                </GridItem>

                {/* 로그인 */}
                <GridItem w='100%' bg='white' area={'login'}>
                    {!loggedIn ? (
                        <>
                            <Box marginLeft='10px'><Link to="/user/login"><Text fontSize='xl' marginTop='8px' color='#765d2f'>로그인</Text></Link></Box>
                            <Box marginLeft='10px'><Link to="/user/join"><Text fontSize='xl' marginTop='8px' color='#765d2f'>회원가입</Text></Link></Box>
                        </>
                    ) : (
                        <Box marginLeft='10px'><Text fontSize="2xl" fontWeight="bold" mb="20px" fontFamily="'Nanum Gothic', cursive">
                            {user.id}님의 회원 정보
                        </Text>
                            <Text fontSize="xl" fontFamily="'Nanum Gothic', cursive">
                                닉네임 {user.nickname}
                            </Text>
                            <Text fontSize="xl" fontFamily="'Nanum Gothic', cursive">
                                이름 {user.name}
                            </Text></Box>
                    )}
                </GridItem>

                {/* 광고단2 */}
                <GridItem w='100%' h='55px' area={'adArea2'} justifyContent="center" alignItems="center">
                    <Link href="https://youtu.be/vXXHdzikJz4?si=28AQ0sXwFBam8RD1" ><Image src={adImage2} alt="ad Image2" width="100%"  /></Link>
                </GridItem>

                {/* 게시판(최신순) */}
                <GridItem w='100%' bg='#E6D7C3' area={'board'}>
                    게시판(최신순)
                </GridItem>

            </Grid>

        </>
    );
};

export default Main;