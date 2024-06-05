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

            <GridItem area={'main'} bg='#FFFEF0  ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                <Text fontSize="3xl" mb="20px">임신 중기 생활 습관</Text>

                <Box>
                    <Text fontSize="3xl" mb="10px">영양 및 체중관리</Text>
                    <Text fontSize="2xl" mb="10px" color="#85662C ">|영양</Text>

                    <Text mb="10px">
                        <strong>철분을 섭취합니다.</strong> <br />
                        임신하게 되면 철분의 요구량이 증가합니다. 따라서 임신 후반부에는 철분제를 복용하는 것을 권장합니다.
                    </Text>


                    <Text mb="20px">
                        <strong>소금의 지나친 섭취를 줄입니다.</strong><br />

                        평소에도 짜게 먹는 것이 해롭지만 특히 임신 중에 짜게 먹게 되면 수분 섭취를 과다하게 하여 부종을 일으키거나 체중을 증가시켜 임신성당뇨병, 임신중독증 등의 위험성을 증가시킵니다. 입맛은 길들이기 나름이므로 건강한 임신을 위해 소금 섭취를 자제하도록 합니다.
                        <br /></Text>


                    <Text mb="10px">
                        <strong>단백질과 마그네슘이 풍부한 음식을 섭취합니다.</strong><br />
                        단백질은 태아의 성장과 뼈와 뼈를 잇는 관절 등의 구성물질인 콜라겐을 만드는데 중요한 영양소일 뿐 아니라, 태아의 두뇌를 만드는데도 직접적으로 작용합니다. 육류의 살코기, 생선, 우유, 두유, 콩 등에 많이 들어 있으므로 부족하지 않게 섭취하도록 합니다. 마그네슘은 골밀도 형성에 도움을 주고 칼슘의 흡수를 돕는 비타민 D의 생성을 조정합니다. 두부나 해조류의 섭취를 늘리면 마그네슘을 보급할 수 있습니다.
                    </Text>
                    <Text mb="20px">
                        <strong>질 높은 단백질 식품을 섭취합니다.</strong><br />
                        단백질이 부족하지 않도록 콩, 등 푸른 생선, 살코기 등을 통해 양질의 단백질을 섭취하도록 합니다. 임산부에서 단백질이 추가적으로 요구되는 이유는 모체혈액량의 증가와 태아, 태반, 자궁 및 유방의 성장과 발달에 필요적인 요소이기 때문입니다. 임신 후반기 동안에 약 1000g의 단백질이 더 필요합니다. 한국인의 경우 임신 제2삼분기에는 1일 15g, 제3삼분기에는 30g의 단백질을 추가적으로 섭취할 것을 권고하고 있습니다.
                        <br /></Text>


                    <Text mb="10px">
                        <strong>부종이 발생할 수 있습니다.</strong><br />
                        많은 임신부가 임신 중에 부종을 경험합니다. 오랫동안 서서 일할 때 저녁이 되면 가볍게 부었다가 아침에 사라지는 정도는 태아의 무게에 의해 혈관이 압박되기 때문에 일어나는 것이므로 크게 걱정할 일은 아닙니다. 체중이 과도하게 증가할 때는 발의 부종이 눈에 띄지 않아도 체내에 부종이 생길 수 있으므로 정기검진 시에 소변검사 등으로 체크를 해 봅니다. 지나친 염분 섭취를 제한합니다.
                        그러나 심한 부종은 임신중독증, 심장 이상과 연관될 수 있으므로 부종이 심하면서 두통, 상복부통증, 시야장애, 호흡곤란 등의 증상이 있으면 즉시 진찰을 받도록 합니다.
                    </Text>
                    <Text mb="20px">
                        <strong>혈액을 만드는 엽산, 비타민 B6, 비타민 B12 등의 섭취가 필요합니다.</strong><br />
                        태아는 혈액을 만드는데 필요한 철분을 태반을 통해 모체로부터 흡수합니다. 그 때문에 임신 중에는 철 결핍성 빈혈이 일어나기 쉬운데 적혈구를 만드는데 기여하는 영양소로 철분 외에도 엽산, 비타민 B6, 비타민 B12 등이 있습니다. 이런 영양소가 함유된 간, 모시조개, 굴, 대합, 육류의 살코기 등을 적극적으로 섭취하도록 합니다.
                        <br /></Text>


                    <Text mb="10px">
                        <strong>산모용 종합 영양제</strong><br />
                        대부분의 임산부는 음식으로 섭취하면 충분하므로 따로 영양제를 복용할 필요는 없지만, 편식이 심한 경우, 신진대사에 필요한 효소의 원료인 아미노산과 비타민, 미네랄 정도가 들어있는 영양제를 먹어 영양소의 균형을 맞추도록 합니다.
                    </Text>


                    <Text fontSize="2xl" mb="10px" color="#85662C ">|체중관리</Text>
                    <Text mb="10px">
                    임신 전 체질량지수에 따라 적절한 체중증가가 되는 것이 좋습니다. 임신 전 정상 신체비만지수를 가진 경우 11.5-16kg의 체중 증가를 권장합니다.
                    </Text>
                </Box>

                <Text>출처 : 임신육아 종합포털 아이사랑</Text>
            </GridItem>
        </Grid>
    );
}

export default PregnancyGuideMPH;