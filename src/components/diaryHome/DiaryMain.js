import { Box, Button, Flex, Grid, GridItem, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalendar';
import { useNavigate } from 'react-router-dom';
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { CiImageOff } from "react-icons/ci";

const DiaryMain = () => {
    const navigate = useNavigate();
    const [showRecordOptions, setShowRecordOptions] = useState(false);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [data, setData] = useState({});
    const [targetDate, setTargetDate] = useState('');
    const [dDay, setDDay] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [serverData, setServerData] = useState(null);
    const [formatDate, setFormatDate] = useState(''); // New state for selected date

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&code=88d947e41e`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setTargetDate(data.expected_date);
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);

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

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    return (
        <Box bg='#fffbf0' h='auto'>
            <HStack w={'100vw'} wrap={"wrap"}>
                <Box 
                    boxSize={window.screen.width >= 760 ? "49vw" : "100vw"}
                    align="center"
                >
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
                    <br/>
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
                </Box>
                <Grid
                    boxSize={window.screen.width >= 760 ? "49vw" : "100vw"}
                    templateAreas={`"calendar" "select" "diaryInfo"`}
                    gridTemplateRows={'3fr 40px 1fr'}
                    gap={2}
                >
                    <GridItem w='95%' area={'calendar'}>
                        <MyCalendar onDateSelect={(formatDate) => {
                            console.log('Selected date:', formatDate);
                            setFormatDate(formatDate); // Update state with selected date
                        }} />
                    </GridItem>
                    <GridItem w='95%' h='150px' bg='pink' area={'diaryInfo'}>
                        <Grid w='100%' h='100%' templateAreas={`"dailyInfo" "babyInfo"`} gridTemplateRows={'1fr 1fr'}>
                            <GridItem w='100%' h='auto' bg='green' textAlign={'center'} area={'dailyInfo'}>
                                [일기]
                            </GridItem>
                            <GridItem w='100%' h='auto' bg='gray' textAlign={'center'} area={'babyInfo'}>
                                [정보]
                            </GridItem>
                        </Grid>
                    </GridItem>
                    <GridItem w='95%' area={'select'}>
                        <Flex justifyContent="flex-end">
                            <Flex flexDirection="column" display={showSearchOptions ? 'flex' : 'none'}>
                            <Button onClick={() => handleOptionClick('showDiary')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>일기 모아보기</Button>
                            <Button onClick={() => handleOptionClick('showInfo')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>정보 모아보기</Button>
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
);
};

export default DiaryMain;
