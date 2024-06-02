// 1. 우선 원래 있던 글의 데이터를 다 가져와서 input에 넣어놓고 수정을 시켜야 함
// 2. 해당 글이 자신의 것임을 미리 검증하는 부분이 필요

import { Box, Button, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCommunity = () => {
    const navigate = useNavigate();

    // 데이터 받아오기
    const [data, setData] = useState({});
    useEffect(() => {
        // 컴포넌트가 마운드될 때 실행되는 useEffect를 사용해 데이터를 서버로부터 받아옴
        // >>> 해당 글 상세보기 가져와야 됨 detail 뒤에 code같은 거 가져와서 수정
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail`)
            .then(response => response.json()) // JSON 형식으로 파싱
            .then(data => setData(data)) // 받아온 데이터를 상태 변수에 저장
            .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
    }, []);

    // 필요한 변수들 불러서 처리
    const [community, setCommunity] = useState({
        code: 0,
        userId: '',
        userNickname: '',
        title: '',
        content: '',
        category: ''
    });

    // 입력 필드값이 변경 될 때마다 호출하는 함수
    const onChange = (event) => {
        const { value, name } = event.target; //event.target에서 name과 value만 가져오기
        setCommunity({
            ...community,
            [name]: value,
        });
    };

    // 수정 버튼 클릭 핸들러
    const handleButtonClick = () => {
        const formData = new FormData();    
        // 변경된 값이 있으면 해당 값을, 없으면 기존 값을 FromData에 추가
        formData.append('title', community.title || data.title);
        formData.append('content', community.content || data.content);
        formData.append('category', community.category || data.category);

        // 서버로 데이터 전송 >>> 이것도 fetch url 수정
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail`, {
            method: 'POST',
            body: formData  // FormData를 요청 본문으로 설정
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate(`detail?command=read/detail&code=${data.code}&category=${community.category}`);
                } else {
                    console.log('데이터 전송 실패');
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
            });
        navigate(`/community/detail?command=read/detail&code=${data.code}`);
    };

    return (
        <>
            <Box id='input-container'>
                <div>
                    <Select defaultValue={data.category} variant='flushed' w='200px' padding='30px'
                        onChange={(e) => setCommunity({ ...community, category: e.target.value })}>
                        <option selected disabled>게시판 선택</option>
                        <option value='notice'>공지사항</option>
                        <option value='chat'>잡담</option>
                        <option value='recommend'>추천</option>
                    </Select>
                </div>
                <VStack>
                    <Input type="text" name='title' value={data.title} onChange={onchange} placeholder='제목을 입력하세요' size='sm' bg='white' w='1400px' h="50px" marginTop='5px' />
                    <Textarea name='content' value={data.content} onChange={onchange} placeholder='내용을 입력하세요.' size='sm' w='1400px' h='1000px' />
                    <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px'>등록하기</Button>
                </VStack>
            </Box>
        </>
    );
};

export default UpdateCommunity;