import { Box, Button, Flex, Grid, GridItem, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalendar';
import { useNavigate } from 'react-router-dom';
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { CiImageOff } from "react-icons/ci";

const DiaryMain = () => {

    const loggedIn = sessionStorage.getItem('isLoggedIn');

    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');

    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);


    const navigate = useNavigate(); // React Router의 history 객체를 가져옵니다.
    const [showRecordOptions, setShowRecordOptions] = useState(false); // 기록 옵션을 표시할지 여부를 관리하는 state
    const [showSearchOptions, setShowSearchOptions] = useState(false);


    // 날짜 계산하기
    const [targetDate, setTargetDate] = useState('');
    const [dDay, setDDay] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [serverData, setServerData] = useState(null);
    const [formatDate, setFormatDate] = useState(''); // New state for selected date

    // 데이터 받아오기
    const [data, setData] = useState({});
    const [babyData, setBabyData] = useState({ codes: [], nicknames: [] });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/enroll?command=giveCode&user_id=${user.id}`)
            .then(response => response.json())
            .then(babyData => {
                if (!babyData.codes) {
                    // babyData가 비어 있는 경우 등록하기 모달을 열기
                    handleModalOpen();
                } else {
                    // babyData가 존재하는 경우 베이비 모달 열기
                    setBabyData({ codes: babyData.codes, nicknames: babyData.nicknames });
                    setIsBabyModalOpen(true);
                }
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);


    const [selectedBabyCode, setSelectedBabyCode] = useState(null);
     const handleClick = (value) => {

        setSelectedBabyCode(value);

        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&code=${value}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data);
                setTargetDate(data.expected_date);
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }


    useEffect(() => {
        if (targetDate) {
            const calculateDDay = () => {
                const target = new Date(targetDate);
                const today = new Date();
                const timeDiff = target.getTime() - today.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                setDDay(dayDiff);
            };
            calculateDDay();
        }
    }, [targetDate]);

    useEffect(() => {
        if (formatDate) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=find&date=${formatDate}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setServerData(data);
                })
                .catch(error => {
                    console.error('데이터를 가져오는 중 에러 발생:', error);
                });
        }
    }, [formatDate]);

    const handleRecordClick = () => {
        setShowRecordOptions(!showRecordOptions);
    };

    const handleSearchClick = () => {
        setShowSearchOptions(!showSearchOptions);
    };

    const handleOptionClick = (option) => {
        if (option === 'writeDiary') {
            navigate('/daily-record');
        } else if (option === 'writeInfo') {
            navigate('/info-record');
        } else if (option === 'showDiary') {
            navigate('/show-diary');
        } else if (option === 'showInfo') {
            navigate('/show-info');
        } else if (option === 'infoBaby') {
            navigate('/baby/info');
        } else if (option === 'joinBaby') {
            navigate('/baby/join');
        } else if (option === 'createBaby') {
            navigate('/baby/create');
        }
    };

    const [isBabyModalOpen, setIsBabyModalOpen] = useState(false); // 베이비 모달 상태

    const handleBabyModalClose = () => {
        setIsBabyModalOpen(false); // 베이비 모달 닫기
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Box bg='#fffbf0' h='auto'>
                <HStack w={'100vw'} wrap={"wrap"} >
                    <Box
                        boxSize={
                            window.screen.width >= 760 ? "49vw" : "100vw"
                        }
                        align="center"
                    >

                        {!babyData.codes ? (
                            <Box
                                marginTop='20px'
                                w="500px"
                                h="500px"
                                border="2px solid #e0ccb3"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"

                            >
                                <Button onClick={handleModalOpen} w='200px' h='70px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>등록하기</Button>
                            </Box>

                        ) : (
                            <>
                                {data.url != null ? (
                                    <Image
                                        src={data.url}
                                        borderRadius='full'
                                        w='500px'
                                        h='300px'
                                        alt='Baby Image'
                                        marginTop='20px'
                                    />
                                ) : (
                                    <Icon as={CiImageOff} w={500} h={300} marginTop='20px' />
                                )}
                                <br />
                                <Text fontSize='4xl' as='b'>{data.nickname}</Text>
                                <Text fontSize='xl'>출산예정일 : {data.expected_date} </Text>
                                {dDay > 0 ? (
                                    <Text fontSize="xl">태어나기까지 {dDay}일</Text>
                                ) : dDay < 0 ? (
                                    <Text fontSize="xl">태어난지 {Math.abs(dDay)}일</Text>
                                ) : (
                                    <Text fontSize="xl"></Text>
                                )}
                                <Button onClick={() => handleOptionClick('infoBaby')} w='100px' bg='#e0ccb3' marginTop='20px' marginRight='10px' _hover={{ color: '#fffbf0' }}>정보보기</Button>
                                <Button onClick={handleModalOpen} w='100px' bg='#e0ccb3' marginTop='20px' _hover={{ color: '#fffbf0' }}>추가하기</Button>

                            </>
                        )}

                        <Modal isOpen={isOpen} onClose={handleModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>등록하기</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Button onClick={() => handleOptionClick('createBaby')} w='100%' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>아기등록</Button>
                                    <Button onClick={() => handleOptionClick('joinBaby')} w='100%' bg='#e0ccb3' marginTop='10px' _hover={{ color: '#fffbf0' }}>아기코드입력</Button>
                                </ModalBody>
                            </ModalContent>
                        </Modal>

                        {/* 베이비 모달 */}
                        <Modal isOpen={isBabyModalOpen} onClose={handleBabyModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>선택하기</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {/* 등록된 Baby 모달창에 표시 */}
                                    <Flex direction="column">
                                        {babyData.nicknames.map((nickname, index) => (
                                            <Button bg='#e0ccb3' _hover={{ color: '#fffbf0' }} key={index} value={babyData.codes[index]} marginBottom="4px" onClick={() => { handleClick(babyData.codes[index]); handleBabyModalClose(); }} >
                                                {nickname}
                                            </Button>
                                        ))}
                                    </Flex>
                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </Box>


                    <Grid boxSize={
                        window.screen.width >= 760 ? "49vw" : "100vw"
                    }
                        templateAreas={`"calendar"
                                 "select"
                                 "diaryInfo"`}
                        gridTemplateRows={'3fr 40px 1fr'}
                        gap={2}>

                        <GridItem w='95%' area={'calendar'}>
                            <MyCalendar />
                        </GridItem>

                        <GridItem w='95%' h='150px' bg='pink' area={'diaryInfo'}>
                            상세
                        </GridItem>

                        <GridItem w='95%' area={'select'}>
                            <Flex justifyContent="flex-end">
                                <Flex flexDirection="column" display={showSearchOptions ? 'flex' : 'none'}>
                                    <Button onClick={() => handleOptionClick('showDiary')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>일기 모아보기</Button>
                                    <Button onClick={() => handleOptionClick('showInfo')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} >정보 모아보기</Button>
                                </Flex>

                                <Button onClick={handleSearchClick} bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>
                                    <HamburgerIcon />
                                </Button>

                                <Flex flexDirection="column" display={showRecordOptions ? 'flex' : 'none'}>
                                    <Button onClick={() => handleOptionClick('writeDiary')} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>하루 기록</Button>
                                    <Button onClick={() => handleOptionClick('writeInfo')} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>정보 기록</Button>
                                </Flex>

                                <Button onClick={handleRecordClick} bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>
                                    <EditIcon />
                                </Button>

                            </Flex>

                        </GridItem>
                    </Grid>
                </HStack>
            </Box>
        </>
    );
};

export default DiaryMain;
