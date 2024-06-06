import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PregnancyGuideEPH = () => {
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

            <GridItem area={'header'} bg='#e0ccb3' display="flex" justifyContent="space-around" alignItems="center">
                <Button onClick={() => navigate('/info/guide/EPU')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} fontFamily="'Nanum Gothic', cursive">임신 초기 이해</Button>
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
                >임신 초기 생활 습관</Button>
            </GridItem>

            <GridItem area={'sidebar'} bg='#e0ccb3' display="flex" flexDirection="column" alignItems="center" padding="40px">
    <Button
        onClick={() => navigate('/info/guide/EPU')}
        mb="10px"
        fontSize="md"
        py="3"
        px="6"
        rounded="md"
        bg="#FFFEF0"
        color="#000000"
        _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}
    >
        임신초기(3~13주)
    </Button>
    <Button onClick={() => navigate('/info/guide/MPU')} mb="10px" fontSize="md" py="3" px="6" rounded="md" bg="#FFFEF0" color="#000000" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>
        임신중기(14~27주)
    </Button>
    <Button onClick={() => navigate('/info/guide/LPU')} mb="10px" fontSize="md" py="3" px="6" rounded="md" bg="#FFFEF0" color="#000000" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>
        임신후기(28~40주)
    </Button>
</GridItem>

            <GridItem area={'main'} bg='#FFFEF0  ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                <Text fontSize="3xl" mb="20px" fontFamily="'Nanum Gothic', cursive">임신 초기 생활 습관</Text>

                <Box>
                    <Text fontSize="3xl" mb="10px" fontFamily="'Nanum Gothic', cursive">영양 및 체중관리</Text>


                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|영양</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        태아 성장에 필요한 영양소는 태아 성장의 90% 이상이 이루어지는 임신 후반기에 주로 필요하지만, 이를 위한 영양소 대사의 변화는 임신 초기부터 일어납니다. 임신부 건강은 태아의 건강과 밀접한 관계가 있고, 예비 엄마의 건강은 올바른 영양 섭취와 밀접한 관계가 있습니다. 임신부가 균형 있는 영양 섭취를 위해 다양한 식품을 골고루 적당히 먹을 수 있는 것이 중요합니다.
                        임신부의 적절한 영양소 섭취 여부를 파악하는 방법 가운데 하나는 체중 증가를 관찰하는 것입니다. 임신 중 체중 증가는 신생아 출생 체중과도 연관성이 있어, 특히 임신 전부터 예비 엄마의 체중이 저체중이면서 체중 증가가 적으면 태아가 저체중아로 태어날 위험이 커집니다. 임신부의 임신 전 체중 상태, 임신 동안의 활동상태 등 여러 가지 상황에 따라 다르지만, 정상 체질량지수인 임신부의 적절한 체중 증가는 12~15㎏ 정도입니다.
                        임신부의 적절한 체중 증가와 아기의 건강을 위해서 임신부가 섭취하여야 할 영양소는 무엇일까요? 비임신 시에 비해 하루 100-300Kcal정도 추가 섭취가 필요하며 주로 제2삼분기 이후부터 열량을 추가로 섭취해야 합니다. 제2삼분기에는 하루 340Kcal, 제3삼분기에는 하루 450Kcal를 추가적으로 섭취할 것을 권고합니다. 특별한 경우를 제외하고 비타민이나 무기질을 보충제로 복용할 필요는 없습니다.
                        임신 중기부터는 철분 요구량이 늘어나므로 철분이 풍부한 식품들을 자주 먹도록 하고, 철분의 흡수를 도와주는 비타민 C도 충분히 먹는 것이 좋습니다.</Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>철분이 풍부한 식품을 먹습니다.</strong><br />
                        태아는 엄마 뱃속에서 활발하게 대사 작용을 하며 하루가 다르게 성장을 합니다. 태아에게 필요한 영양분과 신진대사에 필요한 산소를 실어 운반하는데 중요한 작용을 하는 것이 엄마의 혈액 성분 중 적혈구인데, 이 적혈구에는 산소를 운반하는 색소단백질이 있는데 철을 함유하고 있습니다. 임신한 여성의 경우 몸의 혈장량이 늘어나고, 철분의 요구량이 늘어나기 때문에 다른 이상이 없는데도 임신으로 인해 빈혈이 생기기도 합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>철분의 흡수를 돕는 비타민 C를 섭취합니다.</strong><br />
                        균형 있는 식생활을 갖되 비타민 C는 태아의 활발한 신진대사에 관여하는 철분을 효율적으로 돕는 역할을 합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>충분한 물을 마십니다.
                        </strong><br />
                        입덧으로 인해 자주 토하다 보면 수분 부족이 일어나기 쉽습니다. 또 임신하게 되면 땀을 많이 흘려 수분보충이 필요합니다. 충분한 물을 마시는 일은 혈액과 양수를 만드는 데 도움이 되며 노폐물을 신속하게 밖으로 내보내는 데 도움이 되어 체중조절에도 유리합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>커피 등 카페인을 과도하게 섭취하지 않도록 주의합니다.</strong><br />
                        커피, 홍차, 녹차, 코코아, 콜라 등에는 카페인이 들어있습니다. 하루 1~2잔 정도의 커피는 괜찮지만, 과다하게 카페인을 섭취하는 경우 밤에 잠들기 어렵거나 유산의 위험이 증가할 우려가 있으며 카페인은 커피 외에도 차, 콜라, 코코아, 초콜릿 등에도 함유되어 있으므로 카페인 총량이 과하지 않도록 주의가 필요합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>엽산제</strong><br />
                        임신을 준비하는 여성은 임신 전부터 엽산제를 복용하면 신경관결손 등 기형아 출산을 예방할 수 있습니다. 엽산제는 임신 전부터 복용하여 임신 12~14주까지 꾸준히 복용합니다. 만일, 이전 신경관결손증 태아를 임신한 경험이 있는 경우 하루에 4mg의 고용량 엽산이 권장됩니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>철분제
                        </strong><br />
                        빈혈이 있는 임신부라면 임신 초기부터 철분이 포함된 영양제를 먹어 철분을 보충하도록 합니다. 그러나, 임신 초기에 빈혈이 없다면 임신 초기에는 철분제를 복용할 필요가 없으며 오히려 입덧을 악화시킬 수 있습니다. 임신 중기부터는 이전에 빈혈이 없던 임신부도 본격적으로 철분의 필요량이 증가하므로 철분에 신경을 써야 합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>산모용 종합 영양제</strong><br />
                        대부분의 임산부는 음식물로 섭취하면 충분하므로 따로 영양제를 복용할 필요는 없습니다. 다만, 특정 음식만 먹거나 편식이 심한 경우, 신진대사에 필요한 비타민, 미네랄이 들어있는 영양제를 보충하면 영양소의 균형을 맞추는데 도움이 됩니다.
                    </Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|체중관리</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        임신하게 되면 호르몬의 변화로 피하지방이 축적되기 쉽고 혈액 양도 증가를 하여 정상적으로 체중이 증가합니다. 그러나 지나치게 몸무게가 늘어나면 임신중독증에 걸릴 염려가 커지고 분만을 할 때도 난산을 하기 쉽습니다. 임신 전 체질량지수(BMI)로 정상 체중인 경우 임신 전보다 11.52~16kg 정도 증가하면 표준입니다. 아직은 특별히 체중 변화에 관심을 두지 않아도 될 시기지만 이런 점들을 염두에 두는 것이 좋습니다.
                    </Text>
                    <Text fontSize="3xl" mb="10px" fontFamily="'Nanum Gothic', cursive">수면</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        임신부 숙면은 태아의 성장을 돕고, 임신 트러블을 줄여주는 데 도움을 줍니다. 임신부는 하루 8~9시간을 자는 것이 좋으며 규칙적인 생활습관으로 숙면을 위해 노력합니다. 또한, 밤에 충분한 잠을 못 잤을 경우 낮잠을 15분~30분 정도로 자는 것이 도움이 됩니다. 오후 늦은 낮잠 또는 1시간 이상의 낮잠을 자면 밤잠의 숙면이 어려울 수 있습니다.
                        자궁이 크지 않는 임신 초기에는 자세에 신경 쓰지 않고 편히 자도 됩니다. 단, 임신 중기부터는 배가 나오기 시작하니 이를 고려하여 임신 초기부터 옆으로 누워 자는 자세를 몸에 익히는 것이 좋습니다. 임신 말기에는 왼쪽으로 눕는 것이 자궁의 혈액순환에 도움이 됩니다.

                    </Text>
                </Box>

                <Text fontFamily="'Nanum Gothic', cursive">출처 : 임신육아 종합포털 아이사랑</Text>
            </GridItem>

        </Grid>
    );
}

export default PregnancyGuideEPH;