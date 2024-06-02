import { Box, Button, Center, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Square, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MyCalendar from './MyCalendar';
import { Link, useNavigate } from 'react-router-dom';
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import { CiImageOff } from "react-icons/ci";
import { useSession } from '../module/SessionComponent';

const fetchDiaryDetailInfo = async (formatDate, selectedBabyCode) => {
    const now = new Date();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=find&date=${formatDate ? formatDate : now.toDateString()}&babycode=${selectedBabyCode}`);
    const data = await response.json();
    return data;
}

const DiaryMain = () => {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const selectedBaby = sessionStorage.getItem('isSelectedBaby');
    const userSample = sessionStorage.getItem('userInfo');
    const babySample = sessionStorage.getItem('babyInfo');
    const user = JSON.parse(userSample);
    const baby = JSON.parse(babySample);

    // 오늘날짜 출력
    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());


    const navigate = useNavigate();
    const [showRecordOptions, setShowRecordOptions] = useState(false);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [targetDate, setTargetDate] = useState('');
    const [dDay, setDDay] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [serverData, setServerData] = useState();
    const [formatDate, setFormatDate] = useState('');
    const [data, setData] = useState({});
    const [babyData, setBabyData] = useState({ codes: [], nicknames: [] });
    const { isOpen: isRecordModalOpen, onOpen: onRecordModalOpen, onClose: onRecordModalClose } = useDisclosure();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/enroll?command=giveCode&user_id=${user.id}`)
            .then(response => response.json())
            .then(babyData => {

                if (!babyData.codes) {
                    handleModalOpen();
                } else {
                    if (!selectedBaby) {
                        setBabyData({ codes: babyData.codes, nicknames: babyData.nicknames });
                        setIsBabyModalOpen(true);
                    } else {
                        handleClick(baby.code);
                    }
                }
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, [user.id]);

    const { isSelectedBaby, enrollStatus } = useSession();
    const [selectedBabyCode, setSelectedBabyCode] = useState(null);
    const handleClick = async (value) => {
        setSelectedBabyCode(value);
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&baby_code=${value}&user_id=${user.id}`)
            const data = await response.json();
            setData(data);
            setTargetDate(data.expected_date);
            enrollStatus(data);
        } catch (error) {
            console.error('데이터를 가져오는 중 에러 발생', error);
        }
    };

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
        if (formatDate && selectedBabyCode) {
            fetchDiaryDetailInfo(formatDate, selectedBabyCode).then(data => {
                setServerData(data, selectedBabyCode);
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
        if (option === 'writeInfo') {
            navigate('/info-record/');
        } else if (option === 'showDiary') {
            navigate(`/diary/show/${selectedBabyCode}`);
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

    const [isBabyModalOpen, setIsBabyModalOpen] = useState(false);

    const handleBabyModalOpen = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/enroll?command=giveCode&user_id=${user.id}`)
            .then(response => response.json())
            .then(babyData => {

                if (!babyData.codes) {
                    handleModalOpen();
                } else {
                    setBabyData({ codes: babyData.codes, nicknames: babyData.nicknames });
                    setIsBabyModalOpen(true);
                }
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    };


    const handleBabyModalClose = () => {
        setIsBabyModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    const handleDateSelect = (date) => {
        setFormatDate(date);
    };

    // 다이어리 생성
    const [diary, setdiary] = useState({
        title: '',
        content: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log("name : " + name);
        console.log("value : " + value);
        setdiary(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const [photo, setPhoto] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    }

    // 다중 클릭방지
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = () => {

        setIsLoading(true);

        if (!diary.title) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!diary.content) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!diary.category) {
            alert("제목을 입력해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('babycode', selectedBabyCode);
        formData.append('title', diary.title);
        formData.append('content', diary.content);
        formData.append('category', diary.category);
        if (photo !== null) {
            formData.append('photo', photo);
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/diary?command=create`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    onRecordModalClose();

                    // 입력 성공 후 서버로부터 데이터 가져오기
                    fetchDiaryDetailInfo(currentDate, selectedBabyCode)
                        .then(data => {
                            // 데이터 업데이트
                            setServerData(data);
                        })
                        .catch(error => {
                            console.error('데이터를 가져오는 중 에러 발생', error);
                            alert('데이터를 가져오는 중 에러가 발생했습니다.');
                        });
                } else {
                    console.log('데이터 전송 실패');
                    alert('데이터 전송에 실패했습니다.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data.status === 400) {
                    alert(data.message_diary);
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
                alert('데이터 전송 중 에러가 발생했습니다.');
            });
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
                                        width='300px'
                                        height='auto'
                                        alt='Baby Image'
                                        marginTop='20px'
                                        objectFit='cover'
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
                                <Flex justifyContent="center">
                                    <Button onClick={() => handleOptionClick('infoBaby')} w='210px' bg='#e0ccb3' marginTop='20px' marginRight='10px' _hover={{ color: '#fffbf0' }}>정보보기</Button>
                                </Flex>
                                <Flex justifyContent="center">
                                    <Button onClick={handleModalOpen} w='100px' bg='#e0ccb3' marginTop='20px' marginRight='10px' _hover={{ color: '#fffbf0' }}>추가하기</Button>
                                    <Button onClick={handleBabyModalOpen} w='100px' bg='#e0ccb3' marginTop='20px' _hover={{ color: '#fffbf0' }}>선택하기</Button>
                                </Flex>
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

                        <Modal isOpen={isBabyModalOpen} onClose={handleBabyModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>선택하기</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
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
                            <MyCalendar onDateSelect={handleDateSelect} />
                        </GridItem>

                        <GridItem w='95%' h='150px' bg='pink' area={'diaryInfo'} textAlign={'center'}>
                            <Grid
                                w='100%'
                                h='100%'
                                templateAreas={`"dailyWrite"`}
                                templateRows={'1fr'}
                            >
                                <GridItem bg='blue.300' area={'dailyWrite'}>
                                    <Text fontSize='3xl'>
                                        [일기] :
                                        {!serverData
                                            ? '해당일자의 정보가 없습니다'
                                            : (serverData.date ? `[${serverData.date}]일 ` : '해당일자의 정보가 없습니다')
                                        }
                                        {serverData ? <Link to={`/diary/${serverData.date}/${serverData.baby_code}`}>{serverData.title}</Link> : ""}
                                    </Text>
                                </GridItem>
                            </Grid>
                        </GridItem>

                        <GridItem w='95%' area={'select'}>
                            <Flex justifyContent="flex-end">
                                <Flex flexDirection="column" display={showSearchOptions ? 'flex' : 'none'}>
                                    <Button onClick={() => handleOptionClick('showDiary')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} >일기 모아보기</Button>
                                </Flex>

                                <Button onClick={handleSearchClick} bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>
                                    <HamburgerIcon />
                                </Button>

                                <Flex flexDirection="column" display={showRecordOptions ? 'flex' : 'none'}>
                                    <Button onClick={onRecordModalOpen} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>하루 기록</Button>
                                </Flex>

                                <Button onClick={handleRecordClick} bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>
                                    <EditIcon />
                                </Button>
                            </Flex>
                        </GridItem>
                    </Grid>
                </HStack>
            </Box>

            <Modal isOpen={isRecordModalOpen} onClose={onRecordModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentDate}일의 다이어리 기록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>제목</FormLabel>
                                <Input type="text" name="title" value={diary.title} onChange={handleInputChange} placeholder="제목을 입력하세요" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>내용</FormLabel>
                                <Textarea name="content" value={diary.content} onChange={handleInputChange} placeholder="내용을 입력하세요" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>타입</FormLabel>
                                <Select name="category" value={diary.category} onChange={handleInputChange} placeholder="타입 선택">
                                    <option value="출산전">출산전</option>
                                    <option value="출산후">출산후</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>이미지 업로드</FormLabel>
                                <Input type="file" onChange={handleImageChange} accept="image/*" />
                            </FormControl>
                            <Button
                                onClick={handleButtonClick}
                                colorScheme="teal"
                                size="lg"
                                type="submit"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                저장
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export { fetchDiaryDetailInfo };
export default DiaryMain;
