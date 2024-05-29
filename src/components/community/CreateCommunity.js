import { Box, Button, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCommunity = () => {

    // 데이터 받아오기
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const [community, setCommunity] = useState({
        userId: '',
        userNickname: '',
        title: '',
        content: '',
        category: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunity(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {

        const formData = new FormData();
        formData.append('userId', community.userId);
        formData.append('userNickname', community.userNickname);
        formData.append('title', community.title);
        formData.append('content', community.content);
        formData.append('category', community.category);

        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=create`, {
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

    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    return (
        <>
            <Box id='input-container'>
                <div>
                    <Select defaultValue={community.category} variant='flushed' w='200px' padding='30px'
                        onChange={(e) => setCommunity({ ...community, category: e.target.value })}>
                        <option selected disabled>게시판 선택</option>
                        <option value='notice'>공지사항</option>
                        <option value='chat'>잡담</option>
                        <option value='recommend'>추천</option>
                    </Select>
                </div>
                <VStack>
                    <Input type="text" name='title' value={community.title} onChange={handleInputChange} placeholder='제목을 입력하세요' size='sm' bg='white' w='1400px' h="50px" marginTop='5px' />
                    <Textarea name='content' value={community.content} onChange={handleInputChange} placeholder='내용을 입력하세요.' size='sm' w='1400px' h='1000px' />
                    <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px'>등록하기</Button>
                </VStack>
            </Box>
        </>
    );
};

export default CreateCommunity;