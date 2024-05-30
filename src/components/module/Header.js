import { Box, Button, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';
import { useSession } from './SessionComponent'


const Header = () => {
    const location = useLocation();
    const isDiaryPage = location.pathname === '/diary' || '/baby/create';
    const isCommunityPage = location.pathname === '/community';
    const { isLoggedIn, session } = useSession();
    console.log(isLoggedIn);
    console.log(session);

    return (
        <>
            <Box>
                <Box float='right' display="flex" alignItems="center" marginRight='20px'>
                    {!isLoggedIn ? (
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
                    <Link to='/'><Text fontSize='5xl' as='b' color='#765d2f'>Familiary</Text>
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