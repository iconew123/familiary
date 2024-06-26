import { Box, Grid, GridItem, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PregnancyGuideMPU = () => {
    const navigate = useNavigate();

    return (
        <box h='auto'>
            <Grid
                templateAreas={`"header header header"
                            "sidebar main main"`}
                gridTemplateRows={'50px 1fr'}
                gridTemplateColumns={'150px 1fr 1fr'}
                gap='1'
                height='auto'
            >
                <GridItem area={'header'} bg='#e0ccb3' display="flex" justifyContent="space-around" alignItems="center">
                    <Button
                        onClick={() => navigate('/info/guide/MPU')}
                        mb="10px"
                        fontSize="md"
                        py="3"
                        px="6"
                        rounded="md"
                        bg="#FFFEF0  "
                        color="#000000 "
                        _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}
                    >임신 중기 이해</Button>
                    <Button onClick={() => navigate('/info/guide/MPH')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신 중기 생활 습관</Button>
                </GridItem>

                <GridItem area={'sidebar'} bg='#e0ccb3' display="flex" flexDirection="column" alignItems="center" padding="10px">
                    <Button onClick={() => navigate('/info/guide/EPU')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신초기(3~13주)</Button>
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
                    <Button onClick={() => navigate('/info/guide/LPU')} mb="10px" _hover={{ bg: "#FFAA00", color: "#FFFFFF" }}>임신후기(28~40주)</Button>
                </GridItem>

                <GridItem area={'main'} bg='#FFFEF0 ' display="flex" flexDirection="column" alignItems="center" padding="20px">
                    <Text fontFamily="'Nanum Gothic', cursive" fontSize="3xl" mb="20px">임신 중기 이해</Text>

                    <Box>
                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="3xl" mb="10px">태아성장 및 모체변화</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            임신 중기가 끝날 때 태아는 1kg 일지라도 임신부의 체중은 약 6kg 증가할 것입니다. 이러한 체중 증가는 태반, 자궁, 유방, 그리고 혈액 생성으로 나타날 수 있습니다. 태아의 성장과 발달을 확인 뿐만 아니라 임신부의 건강 확인을 위해서 주기적인 산전검사가 필요합니다. 임신 초기의 입덧 등의 증상으로 힘든 시기를 지난 임신부들에게 임신 중기는 괜찮다고 느껴집니다. 영양 및 식습관, 운동, 휴식 등에 대해 지속해서 신경 쓰셔야 합니다.<br /><br /><br />
                        </Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 14주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            생식기가 외부로 드러나기 시작합니다. 임신 14주가 되면 태반이 거의 완성되어 엄마의 자궁에 뿌리를 내리게 됩니다. 이 시기의 태아는 피부가 두꺼워지며 불투명하게 되어 내장을 보호하게 됩니다. 앞으로 굽었던 자세에서 점차로 등을 펴게 되며 최초의 뼈 조직과 갈비뼈가 나타나게 됩니다. 목이 굵어지고 머리도 커지면서 점점 발달하게 됩니다. 팔, 다리에 관절이 생기고 태아 몸이 점점 더 단단해집니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            이 시기가 되면 자궁이 커지고 양수도 늘어나기 때문에 몸무게가 늘고 배가 나옵니다. 유방이 커지면서 수유를 위한 준비를 합니다. 자궁을 지탱하는 인대가 당겨 사타구니나 허리가 아프고 피곤을 자주 느끼게 됩니다.
                            <br /></Text>

                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 15주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            키는 4주 전보다 두 배로 늘고 체중은 6배로 늘어 16~18cm, 120g 정도가 됩니다. 신장이 형성되어 양수로 소변을 내보내기 시작합니다. 가끔 양수를 마시고 뱉기도 합니다. 목 근처에 있던 폐와 심장이 가슴으로 내려가는 등 내장 기관이 제대로 자리를 잡으며 훨씬 사람다워집니다. 머리가 탁구공만 하고 두개골 안에 뇌가 가득 찹니다. 불완전하지만 뇌가 발달하며 외부 자극에 대해 쾌감과 불쾌감, 불안, 초조 등의 기본적인 감정을 느끼기도 합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            자궁의 크기가 어린아이 머리 크기만큼 되고 자궁 기저부가 확실히 느껴질 정도로 골반 가장자리까지 올라와 아랫배의 부풀어 오름이 눈에 띄게 됩니다. 그렇지만 자궁 위쪽으로 커지기 때문에 방광으로의 압박은 적어집니다. 자주 소변이 마려웠던 증상이 차츰 좋아집니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 16주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            이 시기의 태아의 피부는 지방이 증가하여 불투명하지만, 아직은 빨간빛을 띠고 있습니다. 양수 속에서 태아의 움직임이 활발해져 머리를 도리도리 흔들거나 손발을 따로 움직입니다. 내이가 완성되어 자궁 밖에서 나는 소리도 태아가 직접 들을 수 있습니다. 신장이나 방광도 거의 완성됩니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            안정기에 들어갑니다. 유선이 발달하여 유방이 더욱 커지며 피하지방이 부어 몸매가 두루뭉술해지며 완연한 임신부의 몸이 되어 갑니다. 배가 불러오는 것을 임신부 스스로가 느낄 만큼 태아가 급성장합니다. 위나 소장 같은 내장이 커지는 자궁에 의해 밀려 올라가 식후에 체한 듯 갑갑한 증상과 등이나 허리가 아플 때도 있습니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 17주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            이 시기가 되면 태아는 표정을 짓기 시작해 눈동자를 움직이고 이마를 찡그리거나 울상을 짓기도 합니다. 아직 눈꺼풀은 덮여 있는 상태지만 망막은 빛의 자극에 반응하기 시작합니다. 피부가 튼튼해지고 낡은 세포가 벗겨지는 변화가 시작됩니다. 눈썹, 속눈썹, 머리털이 자라고 손톱, 발톱도 생겨나고 지문도 생깁니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            피부의 색소 침착이 증가합니다. 자궁이 멜론 크기만 하게 커지며 피부의 색소 침착이 증가함에 따라 젖꼭지와 둘레의 색이 훨씬 짙어집니다. 젖꼭지가 따갑고 시큰거리기도 하며 젖샘 분비를 위한 유선의 발달이 두드러지며 유방이 훨씬 커져 수유를 위한 준비가 한창 이루어지는 시기입니다. 피부표면의 정맥이 눈에 띄게 나타나기도 합니다. 임신부에 따라 얼굴에 소위 말하는 임신성 기미가 생겨나기도 합니다. 임신성 기미는 출산 후에는 사라지는 것이 특징입니다.
                            <br /></Text>

                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 18주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            원시적이긴 하지만 신경계통의 발달이 두드러져 촉각, 미각, 청각이 뚜렷해집니다. 다리가 팔보다 길고 다리는 부위마다 적절한 비율로 발달합니다. 양수 속에서의 태아의 움직임이 더욱 활발해져 팔을 구부렸다 펴기도 하며 발길질을 하기도 하고 때때로 엄마에게 이런 움직임이 태동으로 감지되기도 합니다. 태아는 태어나자마자 엄마의 젖꼭지를 빨기 위한 연습으로 입에 닿는 것을 반사적으로 빨기도 합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            빠른 임신부는 태동을 느낍니다. 빠른 임신부는 배 안에서 무언가 꿈틀하는 태아의 움직임을 처음 느낄 수 있는데 이것이 태동입니다. 태동은 보통 초산부의 경우 임신 20주를 기준으로 ±2주경에 나타납니다. 통계적으로 경산부의 경우 초산부보다 태동을 빨리 느낀다고 조사되어 있습니다. 처음 태동을 느끼는 순간은 임신했다는 사실이 실감 나면서 기쁨과 걱정이 교차하게 됩니다.
                            <br /></Text>

                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 19주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            태아의 키는 약 25cm, 체중은 약 300g이 됩니다. 머리둘레는 4.5cm까지 자라 머리가 몸 전체의 ⅓ 정도가 됩니다. 심장박동이 강해져 청진기로 태아의 심음을 들을 수 있습니다. 숫자상으로 거의 어른에 육박할 정도로 신경세포가 발달합니다. 머릿속 간뇌가 발달해 탯줄을 타고 전해지는 엄마의 감정 변화에 따라 반응을 하게 됩니다. 기억력을 담당하는 뇌의 발달로 자주 듣는 엄마, 아빠의 목소리를 기억하게 됩니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            처음엔 뱃속에서 물방울이 보글거리는 듯한 움직임을 느끼는 것을 시작으로 하루하루 힘찬 태동을 감지해갑니다. 그러나 개인차가 있어 초산부의 경우 20주 이후에 태동을 느끼기도 합니다. 아랫배 중간 지점에 임신선이 나타납니다. 태아가 커짐에 따라 자궁저의 높이는 14~18cm 정도가 됩니다. 자궁저는 커진 자궁의 가장 위쪽 끝을 가리키는 것으로 배꼽 부근까지 올라와 의사가 손으로 만져 보면서 진찰을 할 수 있을 정도가 됩니다. 임신 선이라고 부르는 짙은 색 선이 아랫배 중간의 지점에 세로로 나타나고 때론 종아리 뒤에도 나타나기도 합니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 20주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            양수의 양이 늘어나 자유롭게 움직이므로 위치가 자주 변하며 태동이 확실해집니다. 피부표면에 피지선에서 분비되는 태지가 보이기 시작하는데 태지는 분만 시 산도를 부드럽게 통과할 수 있는 윤활유 역할을 합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            태동이 확실해지며 임신 기간 중 모체가 가장 안정되는 시기입니다. 본격적인 안정기에 접어들며 체중 증가가 눈에 두드러지고 배가 눈에 띄게 나온 상태가 되어 임신부임을 감출 수 없는 상태가 됩니다. 태아가 커져서 근육 덩어리인 자궁이 갑작스러운 증가에 수축하려는 성질을 보여 하루 4~6회 정도 배가 단단히 뭉치는 느낌을 받기도 하고 배가 쿡쿡 쑤시기도 합니다. 유선이 발달하여 빠른 임신부의 경우 젖꼭지를 누르면 초유가 나오기도 합니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 21주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            이 시기의 태아는 귀 속에 균형기관이 발달하기 시작하여 머리카락이 확실히 짙어지고 눈썹이나 속눈썹도 자라납니다. 아직 피부색은 붉고 아주 쭈글쭈글 모습을 하고 있으며 피부층이 얇아 혈관 망이 환히 비칩니다. 한편 태아의 입속에는 어른보다 더 많은 미각 봉우리가 있어 맛에 반응하기 시작합니다. 딸꾹질하기도 하며 엄마는 이를 규칙적인 태동을 통해 느낄 수 있습니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            신진대사의 변화로 땀을 많이 흘립니다. 아랫배가 많이 불러오고 자궁을 받치는 복부의 인대가 늘어나서 가끔 복부의 통증을 느끼며 심장의 부담이 많아지면서 소화불량, 헛배부름 증세가 나타날 수 있습니다. 이 시기에는 평소보다 갑상샘 기능이 활발해지므로 많은 양의 땀을 흘리고 조금만 움직여도 숨이 가빠지는 것을 느낄 수 있습니다. 또한, 혈관이 확장되면서 얼굴, 팔, 어깨 등이 쉽게 붉어지고 심할 경우 모반이나 울혈이 나타나기도 합니다. 초산부라도 대부분 태동을 느낄 수 있는 시기입니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 22주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            양수가 많아져 태아는 손발을 자유롭게 움직이며 몸의 방향도 자주 바꿔 이 시기의 태아는 거꾸로 있는 경우가 많습니다. 그러나 29주 이후부터는 점차 머리를 아래로 향하게 되므로 너무 걱정하지 않아도 됩니다. 뇌세포가 더욱 분화되며 태아는 정보처리 능력이 상당히 높아집니다. 양수를 먹은 태아가 오줌을 누기도 합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            체중이 늘고 비대해진 자궁이 골반 속 혈관을 압박해 하반신의 혈액순환에 다소 무리가 가면서 하반신에 울혈이 생길 수도 있습니다. 그러나 출산 후에는 곧 없어지므로 심하지 않다면 크게 걱정하지 않아도 됩니다. 변비가 심한 임신부는 치질로 고생을 할 수 있으니 배변 습관에 조심하도록 합니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 23주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            태아의 키는 약 28~30cm, 체중은 약 650g이 됩니다. 전체 모습이 서서히 균형 잡혀가고 골격, 관절이 발달하여 X레이를 찍어보면 두개골, 척추, 갈비뼈, 팔, 다리 등을 확실히 알아볼 수 있습니다. 눈꺼풀이 움직이기 시작해 눈을 뜹니다. 청력이 발달하여 엄마의 심장 뛰는 소리, 음식물이 소화될 때 위에서 나는 소리, 혈관에서 혈액이 흐르는 소리 등은 물론 자궁 밖에서 나는 모든 소리를 들을 수 있습니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            허벅지, 종아리, 외음부 등에 정맥류가 생기기 쉽습니다. 자궁의 무게는 1.5kg, 자궁저의 높이가 20~24cm가 됩니다. 임신 전보다 5~6kg 체중이 증가하여 등이나 허리가 아프고 발이 붓거나 다리가 저리는 경험을 많이 하게 됩니다. 혈액의 양이 늘어나 혈관이 확장되고 자궁이 커져서 정맥을 압박해 외음부나 허벅지, 종아리 등에 정맥혈관이 꼬불꼬불, 시퍼렇게 확장되는 정맥류가 생기기 쉽습니다.
                            <br /></Text>

                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 24주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            태아는 양수에 둥실 떠서 손발을 자주 움직이고 엉덩이와 발을 위로 추켜든 물구나무 자세를 취합니다. 피부는 투명감을 잃고 완연히 불투명해지며 불그스름한 빛을 띱니다. 그러나 아직 지방이 축적되지 않아 피부표면은 쭈글거립니다. 성기가 발달하지만 아직 남아의 고환은 복부에 있고 여아의 대음순은 아직 미완성 상태입니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            태동이 훨씬 넓은 부위에서 느껴집니다. 아랫배 근처에서 희미하게 느껴지던 태동이 훨씬 넓은 부위에서 느껴집니다. 배가 점점 불러 균형을 잡기가 어려워지고 현기증을 느끼기 쉽습니다. 피부 착색 등 피부에 변화가 오고 복부가 심하게 가려울 수도 있습니다. 유선의 발달로 겨드랑이 아래쪽이 붓는 일도 있을 수 있습니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 25주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            눈꺼풀이 위, 아래로 나뉩니다. 상하가 붙어있던 눈꺼풀이 위, 아래로 갈라집니다. 아직 눈은 보이지 않지만, 엄마가 보내주는 멜라토닌이라는 물질의 증감을 통해 뇌에서 명암을 느낄 수 있습니다. 아직 몸통은 가느다랗지만, 팔, 다리가 길어져 머리와 몸통의 비율이 어느 정도는 정상적으로 변하게 됩니다. 입을 벌려 양수를 마시고 뱉는 일이 자주 있으며 탯줄이나 손가락이 입 근처에 있으면 반사적으로 얼굴을 돌립니다. 손가락을 빨기도 합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            배와 유방 주위에 보라색의 임신선이 생깁니다. 양수가 증가하여 배가 갑자기 불러지면서 몸 구석구석에 보라색 선이 생깁니다. 이것은 피부가 늘어남에 따라 피부밑의 모세혈관이 피부 밖으로 보이는 현상인데 대부분 출산을 하면 사라집니다. 배가 불러오면서 호흡이 점차 가빠지고 잠을 자는 데 어려움을 겪을 수 있습니다.
                            <br /></Text>

                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 26주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            호흡을 위한 연습을 합니다. 머리카락도 많아지고 척수, 심장, 간장이 발달하여 내장기능도 확실해지고 뇌는 더욱 발달합니다. 지각과 운동을 관장하는 부분이 발달하며 몸 전체를 컨트롤하는 일이 가능해집니다. 폐 속에서 폐포가 발달하기 시작하여 호흡을 위한 연습을 합니다. 청각이 더욱 좋아져 바깥 세계에서 들려오는 엄마, 아빠의 목소리를 분명하게 들을 수 있습니다. 피부엔 지방분비가 많아져 지방으로 덮입니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            갈비뼈가 아프고 소화불량이 심해집니다. 태아가 성장하면서 모체의 갈비뼈를 밀어냅니다. 자궁저의 높이가 위로 올라와 맨 아래 갈비뼈가 바깥쪽으로 휘어져 갈비뼈가 아프게 됩니다. 자궁이 커지면서 하복부에 따끔거리는 통증이 느껴지기도 하고 위장을 압박해 소화가 잘 안 되고 대장을 눌러 변비가 더욱 심해집니다. 때때로 자궁이 잠시 단단해졌다가 다시 정상으로 되돌아오고 커진 유방에서 초유가 흘러나오는 임신부도 있습니다.
                            <br /></Text>


                        <Text fontFamily="'Nanum Gothic', cursive" fontSize="2xl" mb="10px" color="#85662C ">|임신 27주차</Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="10px">
                            <strong>1. 태아의 성장</strong><br />
                            폐포가 발달하며 호흡을 위한 준비를 합니다. 태아의 크기는 35cm, 체중은 1kg 정도가 됩니다. 아직 얼굴엔 주름이 많아 마치 노인 같은 표정이며 피부를 덮고 있는 솜털과 같은 배내털은 모근 방향에 따라 비스듬하게 결을 이룹니다. 폐포의 발달로 폐포 주위엔 태아에게 필요한 산소를 흡수하고 이산화탄소를 방출할 혈관이 엄청난 숫자로 늘어납니다. 콧구멍이 열려 태아는 스스로 얕은 호흡을 하고 소리도 냅니다. 사람으로서 기능할 만큼 성장해 가지만, 아직 그 발달이 미숙하여 조산할 경우 의학적 도움이 필요합니다.
                        </Text>
                        <Text fontFamily="'Nanum Gothic', cursive" mb="20px">
                            <strong>2. 모체의 변화</strong><br />
                            임신선은 더욱 진해지고 밤에 쥐가 나기도 합니다. 배가 불러 몸의 균형을 잡기 어렵고 동작이 서툴러집니다. 넘어질 위험이 큰 시기이므로 특히 주의해야 합니다. 몸무게가 6~7kg 이상 증가를 하며 다리에 무리한 힘이 가해져 다리 근육의 피로가 심해집니다. 다리가 붓고 피로해지며 대퇴부 정맥을 압박해 때로 쥐가 나기도 합니다. 이 증세는 밤에 잘 때 심해지는 경향이 있는데 종아리 부분을 꼭꼭 눌러주면 한결 좋아집니다.
                            <br /></Text>

                    </Box>

                    <Text fontFamily="'Nanum Gothic', cursive">출처 : 임신육아 종합포털 아이사랑</Text>
                </GridItem>
            </Grid>
        </box>
    );
}

export default PregnancyGuideMPU;