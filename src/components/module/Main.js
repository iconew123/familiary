import { Box, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import React from 'react';

const Main = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
      // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
      const userSample = sessionStorage.getItem('userInfo');

      // 문자열(JSON)을 다시 리스트로 파싱하여 사용
      const user = JSON.parse(userSample);
    return (
        <>

            <Grid
                h='100vh'
                templateAreas={`"adArea hospital guide login"
                                "adArea board board diary"`}
                gridTemplateColumns={'1fr 1fr 1fr 1fr'}
                gap={1}>

                {/* 광고단 */}
                <GridItem w='100%' bg='purple' area={'adArea'}>
                    광고
                </GridItem>

                {/* 병원 정보 */}
                <GridItem w='100%' bg='lightblue' area={'hospital'}>
                    병원INFO
                </GridItem>

                {/* 임산부 가이드 */}
                <GridItem w='100%' bg='lightpink' area={'guide'}>
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
                        <Box marginLeft='10px'><Text fontSize="2xl" fontWeight="bold" mb="20px">
                        {user.id}님의 회원 정보
                    </Text>
                    <Text fontSize="xl">
                        닉네임 {user.nickname}
                    </Text>
                    <Text fontSize="xl">
                        이름 {user.name}
                    </Text></Box>
                    )}
                </GridItem>

                {/* 다이어리 */}
                <GridItem w='100%' bg='gray' area={'diary'}>
                    다이어리
                </GridItem>

                {/* 게시판(최신순) */}
                <GridItem w='100%' bg='lightgreen' area={'board'}>
                    게시판(최신순)
                </GridItem>

            </Grid>
            
        </>
    );
};

export default Main;