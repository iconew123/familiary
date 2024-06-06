import { Box, Button, Input, Select, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinBabyByCode = () => {
    const [babyInfo, setBabyInfo] = useState({
        user_id: '',
        baby_code: '',
        position: ''
    });

    const navigate = useNavigate();
    const { isOpen: isErrorModalOpen, onOpen: openErrorModal, onClose: closeErrorModal } = useDisclosure();
    const [modalMessage, setModalMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBabyInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const userSample = sessionStorage.getItem('userInfo');
    const user = JSON.parse(userSample);


    const handleButtonClick = () => {
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('position', babyInfo.position);
        formData.append('baby_code', babyInfo.baby_code);

        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=enroll`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (!babyInfo.position) {
                    setModalOpen(true);
                    return;
                }
                
                if (data.dupl) {
                    setModalMessage("이미 등록 중인 아기입니다.")
                    openErrorModal();
                }
                else if (data.baby) {
                    if (data.exists) {
                        setModalMessage("이미 존재하는 포지션입니다.");
                        openErrorModal();
                    } else {
                        navigate('/diary');
                    }
                } else {
                    setModalMessage("존재하지 않는 코드입니다.");
                    openErrorModal();
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
            });
    };

    const [modalOpen, setModalOpen] = useState(false);

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

                <Input placeholder='아기코드' name='baby_code' value={babyInfo.baby_code} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
                <Select placeholder='아기와의 관계' bg='white' w='500px' h='60px' defaultValue={babyInfo.position} onChange={(e) => setBabyInfo({ ...babyInfo, position: e.target.value })}>
                    <option value='mother'>엄마</option>
                    <option value='father'>아빠</option>
                    <option value='family'>가족</option>
                </Select>

                <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px'>등록하기</Button>

                {/* 에러 모달 */}
                <Modal isOpen={isErrorModalOpen} onClose={closeErrorModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>주의</ModalHeader>
                        <ModalBody>
                            {modalMessage}
                        </ModalBody>
                        <ModalFooter>
                            <Button bg='#e0ccb3' _hover={{ color: '#fffbf0' }} mr={3} onClick={closeErrorModal}>
                                확인
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>


                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontFamily="'Nanum Gothic', cursive">필수</ModalHeader>
                    <ModalBody fontFamily="'Nanum Gothic', cursive">
                        아기와의 관계선택은 필수항목입니다. <br />
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} bg='#e0ccb3' _hover={{ color: '#fffbf0' }} onClick={() => setModalOpen(false)} fontFamily="'Nanum Gothic', cursive">
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            </Box>
        </>
    );
};

export default JoinBabyByCode;
