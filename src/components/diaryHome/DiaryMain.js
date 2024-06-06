import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, HStack, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, Textarea, VStack, useDisclosure } from '@chakra-ui/react';
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

const fetchInfoDetail = async (formatInfoDate, selectedBabyCode) => {
    const now = new Date();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/babyInfo?command=read&date=${formatInfoDate ? formatInfoDate : now.toDateString()}&code=${selectedBabyCode}`);
    const data = await response.json();
    return data;
}

const DiaryMain = () => {
    const selectedBaby = sessionStorage.getItem('isSelectedBaby');
    const userSample = sessionStorage.getItem('userInfo');
    const babySample = sessionStorage.getItem('babyInfo');
    const user = JSON.parse(userSample);
    const baby = JSON.parse(babySample);

    const [currentDate, setCurrentDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate());


    const navigate = useNavigate();
    const [showRecordOptions, setShowRecordOptions] = useState(false);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [targetDate, setTargetDate] = useState('');
    const [dDay, setDDay] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [serverData, setServerData] = useState();
    const [serverInfoData, setServerInfoData] = useState();
    const [formatDate, setFormatDate] = useState('');
    const [formatInfoDate, setFormatInfoDate] = useState('');
    const [data, setData] = useState({});
    const [babyData, setBabyData] = useState({ codes: [], nicknames: [] });
    const { isOpen: isRecordModalOpen, onOpen: onRecordModalOpen, onClose: onRecordModalClose} = useDisclosure();
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    
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

    const { enrollStatus } = useSession();
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

    useEffect(() => {
        if (formatInfoDate && selectedBabyCode) {
            fetchInfoDetail(formatInfoDate, selectedBabyCode).then(data => {
                setServerInfoData(data, selectedBabyCode);
            });
        }
        
    }, [formatInfoDate]);

    const handleRecordClick = () => {
        setShowRecordOptions(!showRecordOptions);
    };

    const handleSearchClick = () => {
        setShowSearchOptions(!showSearchOptions);
    };

    const handleOptionClick = (option) => {
if (option === 'showDiary') {
            navigate(`/diary/show/${selectedBabyCode}/${user.id}`);
        } else if (option === 'showInfo') {
            navigate(`/babyInfo/show/${selectedBabyCode}`);
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

    const handleInfoDateSelect = (date) => {
        setFormatInfoDate(date);
    };

    const [diary, setdiary] = useState({
        title: '',
        content: '',
        category: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setdiary(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleInputInfoChange = (e) => {
        const { name, value } = e.target;
        setInfo(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const [photo, setPhoto] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    }

    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = () => {
        setIsLoading(true);
    
        if  (!diary.title)  {
            alert("제목을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if  (!diary.content)  {
            alert("내용을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if  (!diary.category)  {
            alert("카테고리를 선택해주세요.");
            setIsLoading(false);
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
                onRecordModalClose();
                
                fetchDiaryDetailInfo(currentDate, selectedBabyCode)
                    .then(data => {
                        setServerData(data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        alert('데이터를 가져오는 중 에러가 발생했습니다.');
                    });
            } else {
                alert('데이터 전송에 실패했습니다.');
            }
            return response.json();
        })
        .then(json => {
            if(json.status === 400){
                alert("금일 다이어리를 작성하셨습니다. 수정기능을 이용해주세요")
                setIsLoading(false);
            }
        })
        .catch(error => {
            alert('데이터 전송 중 에러가 발생했습니다.');
            setIsLoading(false);
        });
    };

    const linkStyle = {
        color: 'blue',
        textDecoration: 'none',
      };


        const [info, setInfo] = useState({
            height: '',
            weight: '',
            memo: ''
        });

    const handleInfoButtonClick = () => {
        setIsLoading(true);
    
        if  (!info.height && !info.weight)  {
            alert("키와 몸무게를 적어주세요.");
            setIsLoading(false);
            return;
        }
    
        const formInfoData = new FormData();
        formInfoData.append('code', selectedBabyCode);
        formInfoData.append('height', info.height);
        formInfoData.append('weight', info.weight);
        formInfoData.append('spec_note', info.memo);
    
        fetch(`${process.env.REACT_APP_SERVER_URL}/babyInfo?command=create`, {
            method: 'POST',
            body: formInfoData
        })
        .then(response => {
            if (response.ok) {
                onInfoModalClose();
                
                fetchInfoDetail(currentDate, selectedBabyCode)
                    .then(data => {
                        setServerInfoData(data);
                    })
                    .catch(error => {
                        alert('데이터를 가져오는 중 에러가 발생했습니다.');
                    });
            } else {
                alert('데이터 전송에 실패했습니다.');
            }
            return response.json();
        })
        .then(json => {
            if(json.status === 400){
                alert("금일 아기 정보를 작성하셨습니다. 수정기능을 이용해주세요")
                setIsLoading(false);
            }
        })
        .catch(error => {
            alert('데이터 전송 중 에러가 발생했습니다.');
            setIsLoading(false);
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
                                <Button onClick={handleModalOpen} w='200px' h='70px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">등록하기</Button>
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
                                <Text fontSize='4xl' as='b' fontFamily="'Nanum Gothic', cursive">{data.nickname}</Text>
                                <Text fontSize='xl' fontFamily="'Nanum Gothic', cursive">
                                        {new Date(data.expected_date) <= new Date() ? '출산일' : '출산예정일'} : {data.expected_date}
                                    </Text>
                                {dDay > 0 ? (
                                    <Text fontSize="xl" fontFamily="'Nanum Gothic', cursive" >태어나기까지 {dDay}일</Text>
                                ) : dDay < 0 ? (
                                    <Text fontSize="xl" fontFamily="'Nanum Gothic'" >태어난지 {Math.abs(dDay)}일</Text>
                                ) : (
                                    <Text fontSize="xl"></Text>
                                )}


                                <Flex justifyContent="center">
                                    <Button onClick={() => handleOptionClick('infoBaby')} w='210px' bg='#e0ccb3' marginTop='20px' marginRight='10px' fontFamily="'Nanum Gothic'" _hover={{ color: '#fffbf0' }} pointerEvents={!selectedBabyCode ? 'none' : 'auto'}>정보보기</Button>
                                </Flex>
                                <Flex justifyContent="center">
                                    <Button onClick={handleModalOpen} w='100px' bg='#e0ccb3' marginTop='20px' marginRight='10px' fontFamily="'Nanum Gothic'" _hover={{ color: '#fffbf0' }}>추가하기</Button>
                                    <Button onClick={handleBabyModalOpen} w='100px' bg='#e0ccb3' marginTop='20px' fontFamily="'Nanum Gothic'" _hover={{ color: '#fffbf0' }}>선택하기</Button>
                                </Flex>
                            </>
                        )}

                        <Modal isOpen={isOpen} onClose={handleModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>등록하기</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Button onClick={() => handleOptionClick('createBaby')} w='100%' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">아기등록</Button>
                                    <Button onClick={() => handleOptionClick('joinBaby')} w='100%' bg='#e0ccb3' marginTop='10px' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">아기코드입력</Button>
                                </ModalBody>
                            </ModalContent>
                        </Modal>

                        <Modal isOpen={isBabyModalOpen} onClose={handleBabyModalClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader fontFamily="'Nanum Gothic', cursive">선택하기</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Flex direction="column">
                                        {babyData.nicknames.map((nickname, index) => (
                                            <Button bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive" key={index} value={babyData.codes[index]} marginBottom="4px" onClick={() => { handleClick(babyData.codes[index]); handleBabyModalClose(); }} >
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
                        h ='auto'
                        templateAreas={`"calendar"
                                 "select"
                                 "diaryInfo"`}
                        gridTemplateRows={'3fr 40px 1fr'}
                        gap={2}>

                        <GridItem w='95%' area={'calendar'}>
                            <MyCalendar selectedBabyCode={selectedBabyCode} onDateSelect={handleDateSelect} onDateInfoSelect={handleInfoDateSelect} />
                        </GridItem>

                        <GridItem w='95%' h='150px' bg='#E0CCB3' area={'diaryInfo'} textAlign={'center'}>
                            <Grid
                                w='100%'
                                h='100%'
                                templateAreas={`"dailyWrite" "infoWrite"`}
                                templateRows={'1fr ifr'}
                            >
                                <GridItem bg='#E0CCB3' area={'dailyWrite'} >
                                    <Text fontSize='3xl' fontFamily="'Nanum Gothic', cursive">
                                        [일기]
                                        {!serverData
                                            ? '해당일자의 일기가 없습니다'
                                            : (serverData.date ? `[${serverData.date}] ` : '해당일자의 일기가 없습니다')
                                        }
                                        {serverData ? <Link style={linkStyle} to={`/diary/${serverData.date}/${serverData.baby_code}/${user.id}`}>{serverData.title}</Link> : ""}
                                    </Text>
                                </GridItem>

                                <GridItem bg='#E0CCB3' area={'infoWrite'} >
                                    <Text fontSize='3xl' fontFamily="'Nanum Gothic', cursive">
                                        [정보]
                                        {!serverInfoData
                                            ? '해당일자의 정보가 없습니다'
                                            : (serverInfoData.date ? `[${serverInfoData.date}]` : '해당일자의 정보가 없습니다')
                                        }
                                        {serverInfoData && serverInfoData.status !== 400 ? <Link style={linkStyle} to={`/babyInfo/${serverInfoData.date}/${serverInfoData.baby_code}`}>{serverInfoData.height}cm | {serverInfoData.weight}kg</Link> : ""}
                                    </Text>
                                </GridItem>

                            </Grid>
                        </GridItem>

                        <GridItem w='95%' area={'select'}>
                            <Flex justifyContent="flex-end">
                                <Flex flexDirection="column" display={showSearchOptions ? 'flex' : 'none'}>
                                    <Button onClick={() => handleOptionClick('showDiary')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">일기 모아보기</Button>
                                    <Button onClick={() => handleOptionClick('showInfo')} w='120px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">정보 모아보기</Button>
                                </Flex>

                                <Button onClick={handleSearchClick} bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>
                                    <HamburgerIcon />
                                </Button>

                                <Flex flexDirection="column" display={showRecordOptions ? 'flex' : 'none'}>
                                    <Button onClick={onRecordModalOpen} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">하루 기록</Button>
                                    <Button onClick={onInfoModalOpen} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">정보 기록</Button>
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
                    <ModalHeader fontFamily="'Nanum Gothic', cursive">{currentDate}일의 다이어리 기록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">제목</FormLabel>
                                <Input type="text" name="title" value={diary.title} onChange={handleInputChange} placeholder="제목을 입력하세요" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">내용</FormLabel>
                                <Textarea name="content" value={diary.content} onChange={handleInputChange} placeholder="내용을 입력하세요" />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">타입</FormLabel>
                                <Select name="category" value={diary.category} onChange={handleInputChange} placeholder="타입 선택" fontFamily="'Nanum Gothic', cursive">
                                    <option value="출산전">출산전</option>
                                    <option value="출산후">출산후</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">이미지 업로드</FormLabel>
                                <Input type="file" onChange={handleImageChange} accept="image/*" />
                            </FormControl>
                            <Button
                                onClick={handleButtonClick}
                                bg='#e0ccb3' _hover={{ color: '#fffbf0' }} 
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

             <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily="'Nanum Gothic', cursive">{currentDate}일의 정보 기록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">키</FormLabel>
                                <Input type="number" name="height" value={info.height} onChange={handleInputInfoChange} placeholder="키를 입력하세요(cm)" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">몸무게</FormLabel>
                                <Input type="number" name="weight" value={info.weight} onChange={handleInputInfoChange} placeholder="몸무게를 입력하세요(kg)" />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontFamily="'Nanum Gothic', cursive">메모</FormLabel>
                                <Textarea name="memo" value={info.memo} onChange={handleInputInfoChange} placeholder="메모" />
                            </FormControl>
                            <Button
                                onClick={handleInfoButtonClick}
                                bg='#e0ccb3' _hover={{ color: '#fffbf0' }} 
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
export { fetchInfoDetail };
export default DiaryMain;