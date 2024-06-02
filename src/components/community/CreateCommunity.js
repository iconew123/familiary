import { Box, Button, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateCommunity = () => {
    const{ userId, userNickname } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const [community, setCommunity] = useState({
        userId: userId,
        userNickname: userNickname,
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

    // 세션 스토리지에서 저장된 리스트 데이터를 불러올 때
    const userSample = sessionStorage.getItem('userInfo');
    // 문자열(JSON)을 다시 리스트로 파싱하여 사용
    const user = JSON.parse(userSample);

    // 다중 클릭방지
    const [isLoading, setIsLoading] = useState(false);
    const handleButtonClick = () => {
        setIsLoading(true);

        if (!community.title) {
            alert("제목을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (!community.content) {
            alert("내용을 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (!community.category) {
            alert("카테고리를 선택해주세요.");
            setIsLoading(false);
            return;
        }

        // 공지사항에 글을 작성할 수 있는지 여부를 판단
        if (community.category === 'notice' && !user.is_admin) {
            alert("권한이 없습니다. 공지사항에 글을 작성할 수 있는 권한이 필요합니다.");
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('userNickname', user.nickname);
        formData.append('title', community.title);
        formData.append('content', community.content);
        formData.append('category', community.category);
        console.log(community.userId);
        console.log(community.userNickname);
        console.log(community.title);
        console.log(community.content);
        console.log(community.category);

        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=create&userId=user111&userNickname=user111`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate(`/community/${community.category}?command=read/${community.category}`);
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
            <Box id='input-container'>
                <div>
                    <Select value={community.category} variant='flushed' w='200px' padding='30px'
                        onChange={(e) => setCommunity({ ...community, category: e.target.value })}>
                        <option>게시판 선택</option>
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