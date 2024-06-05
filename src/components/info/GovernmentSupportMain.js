import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };

const handleClick = () => {
    alert('준비중입니다.');
};

const GovernmentSupportMain = () => {
    return (
        <Box w='600px' marginX="auto" align='center'>
            <Text fontSize='4xl' fontFamily="'Nanum Gothic', cursive" as='b'>양육비 지원현황</Text> <br/><br/>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">서울특별시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">부산광역시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">대구광역시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">인천광역시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">광주광역시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">대전광역시</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">울산광역시</Button>
            <Link to="/info/government">
                <Button w='120px' h='40px' bg='#e0ccb3' marginRight='5px' marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">
                    경기도
                </Button>
            </Link>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">충청북도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">충청남도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">경상북도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">경상남도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">전라남도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">전북특별자치도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">강원특별자치도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">제주특별자치도</Button>
            <Button onClick={handleClick} w='120px' h='40px' bg='#e0ccb3' marginRight='5px'marginBottom='5px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">세종특별자치시</Button>

            <Text marginTop='20px' fontFamily="'Nanum Gothic', cursive">경기도를 제외한 지역은 업데이트 준비중입니다.</Text>
        </Box>
    );
};

export default GovernmentSupportMain;