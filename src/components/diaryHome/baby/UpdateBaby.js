import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const UpdateBaby = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용해 페이지 이동을 위한 함수를 가져옴

    const babySample = sessionStorage.getItem('babyInfo');
    const baby = JSON.parse(babySample);

    // 데이터 받아오기
    const [data, setData] = useState({}); // 서버로부터 받아올 데이터를 저장할 상태 변수를 선언
    useEffect(() => {
        // 컴포넌트가 마운드될 때 실행되는 useEffect를 사용해 데이터를 서버로부터 받아옴
        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&code=${baby.code}`)
            .then(response => response.json()) // JSON 형식으로 파싱
            .then(data => setData(data)) // 받아온 데이터를 상태 변수에 저장
            .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
    }, []); // 빈 배열을 전달해 컴포넌트가 처음 마운트될 때만 실행되도록 함

    // 아기정보를 업데이트하는데 필요한 상태 변수들을 선언
    const [babyInfo, setBabyInfo] = useState({
        code: '88d947e41e',
        nickname: '',
        name: '',
        gender: '',
        expected_date: '',
        blood_type: '',
        photo: ''
    });

    // 이미지 파일을 저장할 상태 변수 추가
    const [selectedFile, setSelectedFile] = useState(null);

    // 이미지 파일 선택 핸들러
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // 최초의 순간에 babyInfo.expected_date를 설정
    useEffect(() => {
        if (data.expected_date) {
            setBabyInfo(prevState => ({
                ...prevState,
                expected_date: data.expected_date
            }));
        }
    }, [data.expected_date]);


    // 입력 필드 값이 변경될 때마다 호출되는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBabyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    // 수정 버튼 클릭 핸들러
    const handleButtonClick = () => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        console.log('expected_date' + babyInfo.expected_date)

        if (!datePattern.test(babyInfo.expected_date)) {
            setIsOpen(true);
            return;
        }

        const formData = new FormData();
        // 변경된 값이 있으면 해당 값을, 없으면 기존 값을 FromData에 추가
        formData.append('code', babyInfo.code);
        formData.append('nickname', babyInfo.nickname || data.nickname);
        formData.append('name', babyInfo.name || data.name);
        formData.append('gender', babyInfo.gender || data.gender);
        formData.append('expected_date', babyInfo.expected_date || data.expected_date);
        formData.append('blood_type', babyInfo.blood_type || data.blood_type);

        // 이미지 파일이 선택되었으면 폼 데이터에 추가
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }
        // 서버로 데이터 전송
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

                <Text fontSize='4xl' as='b' color='#765d2f' marginTop='30px' marginBottom='30px'>아기 정보 수정하기</Text>

                {/* 태명 입력 필드 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>태명</Text>
                    <Input name='nickname' defaultValue={data.nickname} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                </Flex>

                {/* 이름 입력 필드 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>이름</Text>
                    <Input name='name' defaultValue={data.name} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                </Flex>

                {/* 성별 선택 필드 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>성별</Text>
                    <Select value={babyInfo.gender || data.gender} onChange={(e) => setBabyInfo({ ...babyInfo, gender: e.target.value })} size='lg' bg='white' w='500px' h='60px'>
                        <option value='M'>왕자</option>
                        <option value='F'>공주</option>
                    </Select>
                </Flex>

                {/* 출산예정일 입력 필드 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='10px'>출산예정일</Text>
                    <Input name='expected_date' defaultValue={data.expected_date} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                </Flex>

                {/* 혈액형 선택 필드 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='50px'>혈액형</Text>
                    <Select value={babyInfo.blood_type || data.blood_type} onChange={(e) => setBabyInfo({ ...babyInfo, blood_type: e.target.value })} size='lg' bg='white' w='500px' h='60px'>
                        <option value='A'>A</option>
                        <option value='B'>B</option>
                        <option value='O'>O</option>
                        <option value='AB'>AB</option>
                    </Select>
                </Flex>

                {/* 이미지 파일 입력 필드 추가 */}
                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                <Text fontSize='xl' as='b' marginRight='50px'>이미지</Text>
                        <Input type="file" onChange={handleFileChange} size='lg' bg='white' width='500px' h='60px' />
                    </Flex>

                {/* 수정하기 버튼 */}
                <Button onClick={handleButtonClick} marginTop='20px' marginRight='20px' w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>수정하기</Button>

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

export default UpdateBaby;
