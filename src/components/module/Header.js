import { Box, Button, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
    const location = useLocation();
    const isDiaryPage = location.pathname === '/diary' || '/create-baby'; // 현재 페이지가 diary 페이지인지 확인
    const isCommunityPage = location.pathname === '/community';


    return (
        <>
            <Box>
                <Box float='right' marginRight='20px'>
                    <Link>로그인 | </Link>
                    <Link>회원가입</Link>
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
                            <Link to="/contact"><Text fontSize='xl' marginTop='8px' color='#765d2f'>MYPAGE</Text></Link>
                        </Flex>
                    </nav>
                </Box>
            </Box>
        </>


    );
};

export default Header;