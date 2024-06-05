import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PregnancyGuideLPH = () => {
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
                >임신 말기 이해</Button>
                <Button onClick={() => navigate('/info/guide/LPH')} mb="10px" hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신 말기 생활 습관</Button>
            </GridItem>

            {/* 좌측 버튼들 */}
            <GridItem area={'sidebar'} bg='#e0ccb3' display="flex" flexDirection="column" alignItems="center" padding="10px">
                <Button onClick={() => navigate('/info/guide/EPU')} hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신초기(3~13주)</Button>
                <Button onClick={() => navigate('/info/guide/MPU')} hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신중기(14~27주)</Button>
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
                >임신후기(28~40주)</Button>
            </GridItem>

            {/* 메인 컨텐츠 */}
            <GridItem area={'main'} bg='#FFFEF0  ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                <Text fontSize="3xl" mb="20px">임신 초기 생활 습관</Text>

                <Box>
                    <Text fontSize="3xl" mb="10px">영양 및 체중관리</Text>


                    <Text fontSize="2xl" mb="10px" color="#85662C ">|영양</Text>
                    <Text mb="10px">
                        <strong>철분제</strong><br />
                        빈혈이 있는 임신부라면 임신 초기부터 철분이 포함된 영양제를 먹어 철분을 보충하도록 합니다. 그렇지 않은 임신부라도 이 시기부터는 본격적으로 철분이 필요하게 되므로 이때는 철분에 신경을 써야 합니다.                    </Text>
                    <Text mb="20px">
                        <strong>산모용 종합영양제</strong><br />
                        대부분의 임산부는 음식물로 섭취하면 충분하므로 따로 영양제를 복용할 필요는 없지만, 편식이 심한 경우, 신진대사에 필요한 효소의 원료인 아미노산과 비타민, 미네랄 정도가 들어있는 영양제를 먹어 영양소의 균형을 맞추도록 합니다.                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C ">|체중관리</Text>
                    <Text mb="10px">
                        <strong>여러 번에 걸쳐 조금씩 자주 먹습니다.</strong><br />
                        궁이 상복부까지 올라와 위를 압박하기 때문에 가슴이 답답하고 쓰리기도 합니다.

                        부드러운 음식으로 조금씩 나눠 먹습니다.
                    </Text>
                    <Text mb="20px">
                        <strong>부드러운 음식으로 조금씩 나눠 먹습니다.</strong><br />
                        부드러운 음식으로 조금씩 나눠 먹습니다.
                        자궁이 명치끝까지 올라와 다시 입덧하는 사람처럼 소화도 안 되고 속이 울렁거리는 등의 증상이 나타나기도 하는 시기입니다. 소화가 안 되고 입맛이 떨어집니다. 이럴 때는 무리해서 먹지 말고 하루 식사를 적당한 횟수로 나누어 편하게 먹도록 합니다.                        <br /></Text>



                </Box>

                <Text>출처 : 임신육아 종합포털 아이사랑</Text>
            </GridItem>
        </Grid>
    );
}

export default PregnancyGuideLPH;