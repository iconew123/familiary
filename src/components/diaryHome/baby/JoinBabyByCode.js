import { Box, Button, Input, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinBabyByCode = () => {
// 데이터 받아오기
const [data, setData] = useState({});
const navigate = useNavigate();

const [babyInfo, setBabyInfo] = useState({
    user_id: '',
    baby_code: '',
    position: '',
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBabyInfo(prevState => ({
        ...prevState,
        [name]: value
    }));
};



const handleButtonClick = () => {

    const formData = new FormData();
    formData.append('user_id', babyInfo.user_id);
    formData.append('baby_code', babyInfo.baby_code);
    formData.append('position', babyInfo.position);

    fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=enroll`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
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
            
            <Input placeholder='아기코드' name='baby_code' value={babyInfo.baby_code} onChange={handleInputChange} size='lg' bg='white' w='500px' h='60px' />
            <Select placeholder='아기와의 관계' bg='white' w='500px' h='60px' defaultValue={babyInfo.position}
                 onChange={(e) => setBabyInfo({ ...babyInfo, position: e.target.value })}>
                    <option value='mother'>엄마</option>
                    <option value='father'>아빠</option>
                    <option value='family'>가족</option>
                </Select>

            <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px'>등록하기</Button>

        </Box>
    </>
);
};

export default JoinBabyByCode;