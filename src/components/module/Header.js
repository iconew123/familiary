import { Box, Button, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';



const Header = () => {
    const location = useLocation();
    const isDiaryPage = location.pathname === '/diary' || '/create-baby'; // 현재 페이지가 diary 페이지인지 확인
    const isCommunityPage = location.pathname === '/community';
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');

    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);





    return (
        <>
            <Box>
                <Box float='right' display="flex" alignItems="center" marginRight='20px'>
                    {!loggedIn ? (
                        <>
                            <Box marginLeft='10px'><Link to="/user/login"><Text fontSize='xl' marginTop='8px' color='#765d2f'>로그인</Text></Link></Box>
                            <Box marginLeft='10px'><Link to="/user/join"><Text fontSize='xl' marginTop='8px' color='#765d2f'>회원가입</Text></Link></Box>
                        </>
                    ) : (
                        <Box marginLeft='10px'><Link to="/user/logout"><Text fontSize='xl' marginTop='8px' color='#765d2f'>로그아웃</Text></Link></Box>
                    )}
                </Box>

                <Box>
                    <Text>ㅤ</Text>
                </Box>

                <Box align='center'>
                    <Link to='/main'><Text marginLeft='100px' fontSize='5xl' as='b' color='#765d2f'>Familiary</Text>
                    </Link>
                    <nav>
                        <Flex justify="center" bg='#e0ccb3' h='48px' marginTop='15px'>
                            <Link to='/diary'>
                                <Text fontSize='xl' marginTop='8px' marginRight='20px' color={isDiaryPage ? '#fff' : '#765d2f'}>DIARY</Text>
                            </Link>
                            <Link to='/community'>
                                <Text fontSize='xl' marginTop='8px' marginRight='20px' color={isCommunityPage ? '#fff' : '#765d2f'}>COMMUNITY</Text>
                            </Link>
                            <Select placeholder='INFO' w='80px' size='lg' variant='unstyled' marginTop='11px'>
                                <option value='option1'>임산부 가이드</option>
                                <option value='option2'>정부 지원사업</option>
                                <option value='option3'>병원 정보</option>
                                <option value='option4'>산후조리원 정보</option>
                                <option value='option5'>영양제 정보</option>
                                <option value='option6'>태교·운동</option>
                            </Select>
                            <Link to="/user/MyPage"><Text fontSize='xl' marginTop='8px' color='#765d2f'>MYPAGE</Text></Link>
                        </Flex>
                    </nav>
                </Box>
            </Box>
        </>


    );
};

export default Header;