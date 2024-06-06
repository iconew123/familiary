import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PregnancyGuideEPU = () => {
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

            <GridItem area={'header'} bg='#e0ccb3' display="flex" justifyContent="space-around" alignItems="center" >
                <Button
                    onClick={() => navigate('/info/guide/EPU')}
                    mb="10px"
                    fontSize="md"
                    py="3"
                    px="6"
                    rounded="md"
                    bg="#FFFEF0  "
                    color="#000000 "
                    _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} // 호버시 배경색과 텍스트 색상 변경
                >
                    임신 초기 이해
                </Button>
                <Button onClick={() => navigate('/info/guide/EPH')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신 초기 생활 습관</Button>
            </GridItem>

            {/* 좌측 버튼들 */}
            <GridItem area={'sidebar'} bg='#e0ccb3' display="flex" flexDirection="column" alignItems="center" padding="10px">
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
                >임신초기(3~13주)</Button>
                <Button onClick={() => navigate('/info/guide/MPU')} _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신중기(14~27주)</Button>
                <Button onClick={() => navigate('/info/guide/LPU')} _hover={{ bg: "#FFAA00", color: "#FFFFFF" }} >임신후기(28~40주)</Button>
            </GridItem>

            {/* 메인 컨텐츠 */}
            <GridItem area={'main'} bg='#FFFEF0  ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                <Text fontFamily="'Nanum Gothic', cursive" fontSize="3xl" mb="20px">임신 초기 이해</Text>

                <Box>
                    <Text fontSize="3xl" mb="10px" fontFamily="'Nanum Gothic', cursive">태아성장 및 모체변화</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        임신 첫 12주 또는 첫 3개월 동안, 일반적으로 산모는 1~2kg이 증가하나 혹시 입덧이 있으면 체중은 이보다 덜 증가하거나 감소하는 경우도 있습니다.
                        이 체중 증가의 대부분은 태반과 가슴, 자궁, 그리고 여분의 혈액 생성 등으로 인해 나타납니다.
                        임신 중에는 몸이 더 힘들어지고 심장박동과 호흡 속도가 빨라집니다. 호르몬은 유방을 부드러워지게 하며 더 커지게 합니다.
                        자궁도 커지고 방광에 압력이 가해져 소변을 더 자주 보게 됩니다.<br /><br /><br />
                    </Text>



                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 3주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        아기의 탄생, 그 맨 처음 시작은 수정 정자와 난자가 나팔관에서 만나 수정이 되는 순간에 새 생명이 시작됩니다. 수정란의 크기는 직경 0.2mm 정도. 수정란은 수정된 지 12~15시간이 지나면 세포 분열을 하기 시작합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        거의 변화를 느끼지 못하게 됩니다. 월주기가 28일인 경우에 마지막 생리 첫날부터 14일 후인 배란기에 난소에서 배출된 난자는 나팔관 내에서 정자와 만나 수정이 됩니다. 약 1주일 후 수정란이 나팔관을 따라 자궁강으로 들어옵니다. 이 기간이 임신 3주입니다. 모체는 별 변화를 느끼지 못하게 됩니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 4주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        나팔관을 따라 이동한 수정란이 자궁내막에 착상하여 세포 분열을 반복하는 시기입니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        난소에서 황체호르몬이 계속 분비됩니다. 겉으로 드러나는 뚜렷한 변화는 없지만, 예민한 여성의 경우 감기와 비슷한 증상을 나타내 으슬으슬 춥거나, 열이 오르고 온몸이 나른한 증세가 나타나기도 합니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 5주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        이 시기가 되면 질초음파로 임신낭을 확인할 수 있습니다. 배아는 심장, 간장, 위 등의 장기가 형성되기 시작하는 시기입니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        이 시기에는 입덧이 시작되며 유두가 민감해집니다. 이른 아침이나 빈속일 때 입덧 증세가 심해집니다. 온몸이 나른해지고 졸리며 쉽게 피로해지며 유두가 민감해져 따끔거리고 유방 피부밑의 혈관들이 눈에 띄게 됩니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 6주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        초음파로 배아의 심장박동이 뛰는 것을 볼 수 있습니다. 뇌와 척수의 신경세포 80%가 이 시기에 만들어집니다. 엄마와 태아를 연결하는 태반과 탯줄도 점점 발달합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        임신하면 호르몬의 영향으로 자궁으로 가는 혈액의 양이 늘어나고 대사 작용이 활발해지면서 이로 인해 땀이 많이 나고 질 분비물의 양도 늘어납니다. 질 분비물의 색은 유백색으로 끈적끈적하지만 냄새나 가려움은 거의 없는 것이 특징입니다.
                        <br /> </Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 7주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        사람의 형태를 갖춘 2등신이 됩니다. 머리가 몸 전체의 반 정도를 차지하며 머리와 몸통 구별이 가능해집니다. 마치 물고기처럼 보이던 모양에서 이제 사람의 형태를 갖춘 2등신으로 변하게 됩니다. 머리, 몸체, 팔, 다리 형태가 구별되며 뇌는 급속도로 발달하기 시작합니다. 뇌와 신경세포의 80%가 이 시기에 분화되고 손가락, 발가락이 생기고 아주 희미하긴 하지만 눈, 코, 귀, 입 등도 커집니다. 초음파를 통해 성별의 확인은 불가능하지만, 난소와 고환이 될 조직도 나타납니다. 양수가 생기기 시작하며 태아의 키는 2cm, 체중은 약 4g 정도가 됩니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        소변이 자주 마렵습니다. 임신하게 되면 융모성선 자극 호르몬이라는 호르몬이 분비됩니다. 이 호르몬의 작용 중 하나가 골반 주위로 혈액이 몰리게 하는 것이고 혈액이 골반에 몰리게 되면 아무래도 방광에 자극을 받게 되며 거위 알 정도로 커진 자궁이 방광을 눌러 소변을 더욱 자주 마렵게 합니다.배나 허리가 팽팽해지면서 긴장이 되기도 하고 황체호르몬의 영향으로 장의 움직임이 둔해져 변비에 걸리기 쉽습니다. 또 달이 거듭될수록 자궁이 커지면서 방광을 압박하게 됩니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 8주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        사람의 형태를 갖춘 2등신이 됩니다. 손가락, 발가락이 생기며 눈과 귀의 시신경, 청각신경이 발달합니다. 내장 기관도 형태를 보이기 시작하고 태반이 발달하기 시작하며 탯줄이 될 조직도 생깁니다. 태아의 원시적인 움직임이 시작되어 몸놀림을 관찰할 수 있습니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        유방의 변화가 한층 두드러지고 입덧을 못 느꼈던 임신부도 이 시기엔 정도의 차이가 있지만 대부분 입덧을 느낍니다. 입덧하면 침과 트림이 많이 나오는데 이유는 타액선의 자극으로 침의 양이 증가하고 위와 십이지장의 운동성이 떨어져 음식물이 위에서 발효되기 때문으로 알려져 있습니다. 자궁의 크기가 점차 주먹만 하게 커지며 하복부가 당기거나 요통이 오기도 합니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 9주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        얼굴 윤곽이 차츰 잡혀갑니다. 이 시기에는 몸통과 팔, 다리의 발달이 두드러지고 얼굴 윤곽이 확실해집니다. 귀가 발달하기 시작하고 치아 돌기가 형성되며. 피부가 두 개 층으로 분화하기 시작하기 시작합니다. 태아는 몸 전체를 굼실굼실하면서 양수 안에서 헤엄을 칩니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        유방의 변화가 한층 두드러지고 입덧을 못 느꼈던 임신부도 이 시기엔 정도의 차이가 있지만 대부분 입덧을 느낍니다. 입덧하면 침과 트림이 많이 나오는데 이유는 타액선의 자극으로 침의 양이 증가하고 위와 십이지장의 운동성이 떨어져 음식물이 위에서 발효되기 때문으로 알려져 있습니다. 자궁의 크기가 점차 주먹만 하게 커지며 하복부가 당기거나 요통이 오기도 합니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 10주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        물고기의 꼬리 같은 부분이 점차 없어지며 몸은 곧게 펴지고 길어집니다. 손가락, 발가락 5개가 분명히 보이고 얼굴 피부밑으로 눈두덩, 입술, 아래턱, 뺨도 발달하기 시작하여 기초적인 안면 골격이 나타납니다. 귀는 내이와 외이로 분화되며 눈꺼풀도 생깁니다. 약간의 색소가 안구에 모이며 콧구멍의 모습도 초음파로 보이기 시작합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        자궁이 주먹 크기 정도로 커집니다. 자궁이 아직 골반 내에 있어 배가 부르지는 않지만, 치골 위에 손을 대보면 자궁이 커진 것을 확실히 느낄 수 있습니다. 커진 자궁이 방광과 직장을 압박하여 소변보는 횟수가 잦아집니다. 질과 음부에 공급되는 혈액량이 늘어 짙은 자주색을 띠고 분비물도 늘게 됩니다. 분비물이 늘어나는 것은 질의 세균이 자궁으로 들어가 태아에게 감염을 일으키는 것을 막기 위한 보호의 역할을 합니다. 단 냉과 구별해야 할 것은 분비물이 진한 노란색이거나 치즈처럼 엉긴 찌꺼기가 나오거나 가려울 때는 곰팡이나 세균 등에 감염된 것일 수 있으므로 치료를 받아야 합니다.
                        <br /> </Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 11주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        태아가 신체상으로 거의 4배 성장을 합니다. 키는 약 5~9cm, 체중은 약 20g이 됩니다. 모낭 속의 체모가 자라나 솜털이 생기고 모든 체내 기관이 발달하여 심장, 간, 비장, 맹장, 내장이 발달합니다. 내장은 원형의 고리를 만들 정도로 길게 형성되고 순환기관도 자리를 잡게 됩니다. 초음파 도플러로 태아 심음을 들을 수 있습니다. 대부분 근육조직이 형태를 갖추기 시작하고 사지가 확실히 구별, 길이도 길어져 손목과 손가락이 나타납니다. 다리도 허벅지, 종아리, 발로 분화되고 성기도 형성되기 시작합니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        대사량이 증가하여 분비물이 더욱 늘어날 수 있습니다. 체내 혈액 총량이 늘어나고 골반 내의 혈액순환이 더욱 왕성해짐에 따라 유백색의 분비물이 더욱 늘어날 수 있습니다. 허리가 무겁게 느껴지며 발목에 경련이 일어나기도 하며 변비나 설사가 생기기도 합니다. 예전에 피부 문제가 있었던 임신부는 피부가 건조해져 가려움증이 느껴지기도 합니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 12주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        태아의 얼굴과 몸에 배내털로 불리는 솜털이 나서 덮이기 시작합니다. 뇌가 급속도로 발달하고 머리는 다른 부분에 비교해 상당히 커서 탁구공만 한 크기로 전신의 ⅓ 정도를 차지합니다. 아직 뇌의 표면은 매끄럽고 주름이 잡혀있지 않습니다. 근육과 뼈가 발달하고 턱에는 32개의 영구치가 될 뿌리가 들어있습니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        입덧이 차츰 가라앉고 편안해집니다. 입덧 증세가 차츰 없어지며 식욕이 늘게 되어 임신부의 얼굴색이 좋아집니다. 정신적으로 안정, 편안한 상태가 되며 고온기였던 기초체온이 떨어지기 시작하여 출산할 때까지 계속됩니다. 배가 나오는 임신부도 있습니다. 태아가 성장하며 자궁 기저부가 확실히 느껴지게 됩니다.
                        <br /></Text>

                    <Text fontSize="2xl" mb="10px" color="#85662C " fontFamily="'Nanum Gothic', cursive">|임신 13주차</Text>
                    <Text mb="10px" fontFamily="'Nanum Gothic', cursive">
                        <strong>1. 태아의 성장</strong><br />
                        이 시기가 되면 투명하게 보이던 피부가 점차 살이 오르고 심장박동이 힘차 얼굴에 붉은 기운이 감돌게 됩니다. 눈꺼풀은 아직 내리 덮인 채로 형태가 잡히는 중이지만 눈은 거의 형태를 갖추고 두 눈이 콧등 주변으로 모이기 시작합니다. 그러나 아직 서로 멀리 떨어져 있습니다. 목이 생기고 어른 턱밑 군살처럼 생겼던 바깥귀가 점차 목 윗부분으로 올라가게 됩니다. 이때가 되면 양수의 양도 늘어납니다.
                    </Text>
                    <Text mb="20px" fontFamily="'Nanum Gothic', cursive">
                        <strong>2. 모체의 변화</strong><br />
                        호르몬 분비량이 안정적으로 변화하며 불안하던 감정이 차츰 가라앉게 됩니다. 혈관이 확정되어 혈압이 감소하고, 손과 발의 정맥이 이완, 모체는 손발이 항상 따뜻한 상태가 됩니다.
                        <br /></Text>

                </Box>

                <Text fontFamily="'Nanum Gothic', cursive">출처 : 임신육아 종합포털 아이사랑</Text>
            </GridItem>
        </Grid>
    );
}

export default PregnancyGuideEPU;