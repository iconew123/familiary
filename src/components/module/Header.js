import { Box, Button, Center, Flex, Heading, Select } from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
<link href="https://fonts.googleapis.com/css2?family=Gaegu&display=swap" rel="stylesheet"></link>

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isDiaryPage = location.pathname === '/diary';
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    const handleSelectChange = (e) => {
        e.preventDefault();
        const selectedOption = e.target.value;
        let url = '';
    
        switch (selectedOption) {
            case 'notice':
                url = '/community/notice?command=read/notice';
                break;
            case 'chat':
                url = '/community/chat?command=read/chat';
                break;
            case 'recommend':
                url = '/community/recommend?command=read/recommend';
                break;
            case 'guide':
                url = '/info/guide/EPU';
                break;
            case 'hospital':
                url = '/info/hospitalInfo';
                break;
            case 'government':
                url = '/info/governmentMain';
                break;
            case 'preantal':
                url = '/info/preantalEduation';
                break;
            default:
                break;
        }
    
        if (url) {
            navigate(url);
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
                            <Select placeholder='INFO' w='80px' size='lg' variant='unstyled' marginTop='11px' fontFamily="'Nanum Gothic', cursive" onChange={handleSelectChange}>
                                <option value='guide'>임산부 가이드</option>
                                <option value='government'>정부 지원사업</option>
                                <option value='hospital'>병원 정보</option>
                                <option value='preantal'>태교·운동</option>
                            </Select>
                            <Link to="/user/myPage"><Text fontSize='xl' marginTop='8px' color='#765d2f' fontFamily="'Nanum Gothic', cursive">MYPAGE</Text></Link>
                        </Flex>
                    </nav>
                </Box>
            </Box>
        </>

    );
};

export default Header;
