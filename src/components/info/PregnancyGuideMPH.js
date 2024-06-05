import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PregnancyGuideMPH = () => {
    const navigate = useNavigate();

    return (
        <Grid
            templateAreas={`"header header header"
                            "sidebar main main"`}
            gridTemplateRows={'50px 1fr'}
            gridTemplateColumns={'150px 1fr 1fr'}
            gap='1'
            height='auto'
        >
            {/* 상단 버튼들 */}
            <GridItem area={'header'} bg='#e0ccb3' display="flex" justifyContent="space-around" alignItems="center">
                <Button
                    onClick={() => navigate('/info/guide/EPU')}
                    mb="10px"
                    fontSize="md"
                    py="3"
                    px="6"
                    rounded="md"
                    bg="#FFFEF0  "
                    color="#000000 "
                    _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}
                >임신 중기 이해</Button>
                <Button onClick={() => navigate('/info/guide/MPH')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신 중기 생활 습관</Button>
            </GridItem>

            {/* 좌측 버튼들 */}
            <GridItem area={'sidebar'} bg='#e0ccb3' display="flex" flexDirection="column" alignItems="center" padding="10px">
                <Button onClick={() => navigate('/info/guide/EPU')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신초기(3~13주)</Button>
                <Button
                    onClick={() => navigate('/info/guide/EPU')}
                    mb="10px"
                    fontSize="md"
                    py="3"
                    px="6"
                    rounded="md"
                    bg="#FFFEF0  "
                    color="#000000 "
                    _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}
                >임신중기(14~27주)</Button>
                <Button onClick={() => navigate('/info/guide/LPU')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신후기(28~40주)</Button>
            </GridItem>


            {/* 메인 컨텐츠 */}

            <GridItem area={'main'} bg='#FFFEF0 ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                <Text fontSize="3xl" mb="20px">임신 중기 생활 습관</Text>

                <Box>
                    <Text fontSize="3xl" mb="10px">영양 및 체중관리</Text>


                    <Text fontSize="2xl" mb="10px" color="#85662C ">|영양</Text>
                    <Text mb="10px">
                        <strong>철분제</strong><br />
                    </Text>


                </Box>

                <Text>출처 : 임신육아 종합포털 아이사랑</Text>
            </GridItem>
        </Grid>
    );
}

export default PregnancyGuideMPH;