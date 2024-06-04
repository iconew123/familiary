import { Box, Button, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom';
<link href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap" rel="stylesheet"></link>

const Header = () => {
    const location = useLocation();
    const isDiaryPage = location.pathname === '/diary';
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');

    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);

    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };


    const handleSelectChange = (e) => {
        const selectedOption = e.target.value;
        let url = '';

        switch (selectedOption) {
            case 'notice':
                url = 'http://localhost:3000/familiary/community/notice?command=read/notice';
                break;
            case 'chat':
                url = 'http://localhost:3000/familiary/community/chat?command=read/chat';
                break;
            case 'recommend':
                url = 'http://localhost:3000/familiary/community/recommend?command=read/recommend';
                break;
            case 'guide':
                url = 'http://localhost:3000/familiary/info/guide';
                break;
            default:
                break;
        }

        if (url) {
            window.location.href = url;
        }
    };

    return (
        <>
            <Box>
                <Box float='right' display="flex" alignItems="center" marginRight='20px'>
                    {!loggedIn ? (
                        <>
                            <Box marginLeft='10px'><Link to="/user/login"><Text fontSize='xl' marginTop='8px' color='#765d2f' fontFamily="'Nanum Gothic', cursive">로그인</Text></Link></Box>
                            <Box marginLeft='10px'><Link to="/user/join"><Text fontSize='xl' marginTop='8px' color='#765d2f' fontFamily="'Nanum Gothic', cursive">회원가입</Text></Link></Box>
                        </>
                    ) : (
                        <Box marginLeft='10px'><Link to="/user/logout"><Text fontSize='xl' marginTop='8px' color='#765d2f' fontFamily="'Nanum Gothic', cursive">로그아웃</Text></Link></Box>
                    )}
                </Box>

                <Box align='center'>
                    <Link to='/'><Text marginLeft='100px' fontSize='5xl' as='b' color='#765d2f' >Familiary</Text>
                    </Link>
                    <nav>
                        <Flex justify="center" bg='#e0ccb3' h='48px' marginTop='15px'>
                            <Link to={loggedIn ? '/diary' : '/user/login'}>
                                <Text fontSize='xl' marginTop='8px' marginRight='20px' color={isDiaryPage ? '#fff' : '#765d2f'} fontFamily="'Nanum Gothic', cursive">DIARY</Text>
                            </Link>
                            <Select
                                w='150px'
                                size='lg'
                                variant='unstyled'
                                marginTop='11px'
                                fontFamily="'Nanum Gothic', cursive"
                                onChange={handleSelectChange}
                            >
                                <option>COMMUNITY</option>
                                <option value="notice">공지사항</option>
                                <option value="chat">자유 게시판</option>
                                <option value="recommend">추천 게시판</option>
                            </Select>
                            <Select placeholder='INFO' w='80px' size='lg' variant='unstyled' marginTop='11px' fontFamily="'Nanum Gothic', cursive">
                                <option value='guide'>임산부 가이드</option>
                                <option value='option2'>정부 지원사업</option>
                                <option value='option3'>병원 정보</option>
                                <option value='option4'>산후조리원 정보</option>
                                <option value='option5'>영양제 정보</option>
                                <option value='option6'>태교·운동</option>
                            </Select>
                            <Link to="/user/MyPage"><Text fontSize='xl' marginTop='8px' color='#765d2f' fontFamily="'Nanum Gothic', cursive">MYPAGE</Text></Link>
                        </Flex>
                    </nav>
                </Box>
            </Box>
        </>

    );
};

export default Header;