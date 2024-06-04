import { Box, Button, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateCommunity = () => {
    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');
    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);
    const navigate = useNavigate();

    const [community, setCommunity] = useState({
        userId: '',
        userNickname: '',
        title: '',
        content: '',
        category: '',
    });

    useEffect(() => {
        // 세션 스토리지에서 저장된 유저 정보를 불러옴
        const userSample = sessionStorage.getItem('userInfo');
        if (userSample) {
            const user = JSON.parse(userSample);
            setCommunity(prevState => ({
                ...prevState,
                userId: user.id,
                userNickname: user.nickname,
            }));
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommunity(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = async () => {
        setIsLoading(true);

        if (!community.title || !community.content || !community.category) {
            alert("제목, 내용, 카테고리를 모두 입력해주세요.");
            return;
        }

        // 공지사항에 글을 작성할 수 있는지 여부를 판단
        if (community.category === 'notice' && !user.is_admin) {
            alert("권한이 없습니다. 공지사항에 글을 작성할 수 있는 권한이 필요합니다.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(community)
            });

            if (response.ok) {
                console.log('데이터 전송 성공');
                navigate(`/community/${community.category}?command=read/${community.category}`);
            } else {
                console.log('데이터 전송 실패')
            }
        } catch (error) {
            console.error('데이터를 전송하는 중 에러 발생', error);
        }
    };

    console.log(community);

    return (
        <>
            <Box id='input-container'>
                <div>
                    <Select value={community.category} variant='flushed' w='200px' padding='30px'
                        onChange={(e) => setCommunity({ ...community, category: e.target.value })}>
                        <option disabled value=''>게시판 선택</option>
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