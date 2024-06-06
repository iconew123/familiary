import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const UpdateBaby = () => {

    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };


    const navigate = useNavigate();

    const userSample = sessionStorage.getItem('userInfo');
    const babySample = sessionStorage.getItem('babyInfo');

    const user = JSON.parse(userSample);
    const baby = JSON.parse(babySample);

    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&baby_code=${baby.code}&user_id=${user.id}`)
            .then(response => response.json()) 
            .then(data => setData(data))
            .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
    }, [])

    const [babyInfo, setBabyInfo] = useState({
        code: baby.code,
        nickname: '',
        name: '',
        gender: baby.gender,
        expected_date: '',
        blood_type: baby.blood_type,
        photo: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    useEffect(() => {
        if (data.expected_date) {
            setBabyInfo(prevState => ({
                ...prevState,
                expected_date: data.expected_date
            }));
        }
    }, [data.expected_date]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBabyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(babyInfo.expected_date) || babyInfo.expected_date === '') {
            setIsOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append('code', babyInfo.code);
        formData.append('nickname', babyInfo.nickname || data.nickname);
        formData.append('name', babyInfo.name || data.name);
        if (babyInfo.gender !== null) {
            formData.append('gender', babyInfo.gender);
        }
        formData.append('expected_date', babyInfo.expected_date || data.expected_date);
        if (babyInfo.blood_type !== null) {
            formData.append('blood_type', babyInfo.blood_type);
        }

        if (selectedFile) {
            formData.append('photo', selectedFile);
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=update&code=${baby.code}`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate('/diary');
                } else {
                    console.log('데이터 전송 실패');
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
            });
    };

    return (

        <>

            <Box
                bg='#fffbf0'
                h='auto'
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection='column'>

                <Text fontSize='4xl' as='b' color='#765d2f' marginTop='30px' marginBottom='30px' fontFamily="'Nanum Gothic', cursive">아기 정보 수정하기</Text>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px' fontFamily="'Nanum Gothic', cursive">태명</Text>
                    <Input name='nickname' defaultValue={data.nickname} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' fontFamily="'Nanum Gothic', cursive" />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px' fontFamily="'Nanum Gothic', cursive">이름</Text>
                    <Input name='name' defaultValue={data.name} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' fontFamily="'Nanum Gothic', cursive" />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px' fontFamily="'Nanum Gothic', cursive">성별</Text>
                    <Select value={babyInfo.gender || data.gender} onChange={(e) => setBabyInfo({ ...babyInfo, gender: e.target.value })}size='lg' bg='white' w='500px' h='60px' fontFamily="'Nanum Gothic', cursive">
                        <option value=''>-- 선택 --</option>
                        <option value='M'>왕자</option>
                        <option value='F'>공주</option>
                    </Select>
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='10px' fontFamily="'Nanum Gothic', cursive">출산예정일</Text>
                    <Input name='expected_date' defaultValue={data.expected_date} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' fontFamily="'Nanum Gothic', cursive" />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='50px' fontFamily="'Nanum Gothic', cursive">혈액형</Text>
                    <Select value={babyInfo.blood_type || data.blood_type} onChange={(e) => setBabyInfo({ ...babyInfo, blood_type: e.target.value })} size='lg' bg='white' w='500px' h='60px' fontFamily="'Nanum Gothic', cursive">
                        <option value=''>-- 선택 --</option>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='O'>O</option>
                        <option value='AB'>AB</option>
                    </Select>
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='50px' fontFamily="'Nanum Gothic', cursive">이미지</Text>
                    <Input type="file" onChange={handleFileChange} size='lg' bg='white' width='500px' h='60px' fontFamily="'Nanum Gothic', cursive" />
                </Flex>

                <Button onClick={handleButtonClick} marginTop='20px' marginRight='20px' w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }} fontFamily="'Nanum Gothic', cursive">수정하기</Button>

            </Box>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily="'Nanum Gothic', cursive">필수</ModalHeader>
                    <ModalBody fontFamily="'Nanum Gothic', cursive">
                        출산예정일은 필수항목입니다. <br />
                        yyyy-mm-dd 형식으로 입력해주세요.
                    </ModalBody>
                    <ModalFooter>
                        <Button contrastmr={3} bg='#e0ccb3' _hover={{ color: '#fffbf0' }} onClick={() => setIsOpen(false)} fontFamily="'Nanum Gothic', cursive">
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UpdateBaby;
