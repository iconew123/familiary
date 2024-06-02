import { Box, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBaby = () => {

    // 데이터 받아오기
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const [babyInfo, setBabyInfo] = useState({
        nickname: '',
        name: '',
        gender: '',
        expected_date: '',
        blood_type: '',
        position: '',
        photo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBabyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [photo, setPhoto] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file); // 이미지 파일을 photo state에 저장
    };


    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');
    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);


    const [isOpen, setIsOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const handleButtonClick = () => {
        console.log("id: " + user.id);

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        if (!datePattern.test(babyInfo.expected_date)) {
            setIsOpen(true);
            return;
        }

        setLoading(true); // 로딩 상태 시작

        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('nickname', babyInfo.nickname);
        formData.append('name', babyInfo.name);
        formData.append('gender', babyInfo.gender);
        formData.append('expected_date', babyInfo.expected_date);
        formData.append('blood_type', babyInfo.blood_type);
        formData.append('position', babyInfo.position);
        formData.append('photo', photo); // 이미지 파일을 formData에 추가

        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=create`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                setLoading(false); // 로딩 상태 종료
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate('/diary');
                } else {
                    console.log('데이터 전송 실패')
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


                <Text fontSize='4xl' as='b' color='#765d2f' marginTop='30px' marginBottom='30px'>아기 등록하기</Text>
                <Input placeholder='태명' name='nickname' value={babyInfo.nickname} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                <Input placeholder='이름' name='name' value={babyInfo.name} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                <RadioGroup
                    bg='white'
                    w='500px'
                    h='60px'
                    outline='1px solid'
                    outlineColor='blue.100'
                    defaultValue={babyInfo.gender}
                    onChange={(value) => setBabyInfo({ ...babyInfo, gender: value })}>
                    <Stack spacing={5} direction='row' alignItems='center'>
                        <Radio color='#765d2f' size='lg' colorScheme='yellow' value='M'>
                            남자
                        </Radio>
                        <Radio color='#765d2f' size='lg' colorScheme='yellow' value='F'>
                            여자
                        </Radio>
                    </Stack>
                </RadioGroup>

                <Input placeholder='출산예정일' name='expected_date' value={babyInfo.expected_date} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                <Select placeholder='혈액형' bg='white' w='500px' h='60px' defaultValue={babyInfo.blood_type}
                    onChange={(e) => setBabyInfo({ ...babyInfo, blood_type: e.target.value })}>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='O'>O</option>
                    <option value='AB'>AB</option>
                </Select>

                <Select placeholder='아기와의 관계' bg='white' w='500px' h='60px' defaultValue={babyInfo.position}
                    onChange={(e) => setBabyInfo({ ...babyInfo, position: e.target.value })}>
                    <option value='mother'>엄마</option>
                    <option value='father'>아빠</option>
                </Select>

                <Input
                    type='file'
                    bg='white'
                    w='500px'
                    h='60px'
                    size='lg'
                    accept='image/*'
                    onChange={handleImageChange}
                    marginBottom='10px'
                />

                <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px' disabled={loading}>
                    {loading ? <Spinner size='sm' /> : '등록하기'}
                </Button>
            </Box>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>필수</ModalHeader>
                    <ModalBody>
                        출산예정일은 필수항목입니다. <br />
                        yyyy-mm-dd 형식으로 입력해주세요.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} bg='#e0ccb3' _hover={{ color: '#fffbf0' }} onClick={() => setIsOpen(false)}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateBaby;