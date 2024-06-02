import { Box, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';
const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };

const Footer = () => {
    return (
        <>
            <Box>
                <Box>
                <Flex justify="center" bg='#F2DBC2' h='30px' marginTop='15px'>
                    <Link fontFamily="'Nanum Gothic', cursive">광고&제휴 문의</Link>ㅤ|ㅤ
                    <Link fontFamily="'Nanum Gothic', cursive"> 회사소개</Link>ㅤ|ㅤ
                    <Link fontFamily="'Nanum Gothic', cursive"> 이용약관</Link>ㅤ|ㅤ
                    <Link fontFamily="'Nanum Gothic', cursive"> 개인정보처리방침</Link>

                </Flex>
                </Box>
                <Text textAlign='center' fontFamily="'Nanum Gothic', cursive">(주)삼김일윤ㅤ|ㅤ대표 : 김재현</Text>
            </Box>
        </>
    );
};

export default Footer;