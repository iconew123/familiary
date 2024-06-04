// 1. 우선 원래 있던 글의 데이터를 다 가져와서 input에 넣어놓고 수정을 시켜야 함
// 2. 해당 글이 자신의 것임을 미리 검증하는 부분이 필요

import { Box, Button, Input, Select, Text, Textarea, VStack } from '@chakra-ui/react';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const UpdateCommunity = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code'); // URL에서 code 파라미터 가져오기
    const category = searchParams.get('category');

    // 데이터 받아오기
    const [data, setData] = useState({
        code: '',
        userId: '',
        userNickname: '',
        title: '',
        content: '',
        category: '',
    });

    const [user, setUser] = useState(null);

    useEffect(() => {
        // 세션에서 사용자 정보 가져오기
        const userSample = sessionStorage.getItem('userInfo');
        const userInfo = JSON.parse(userSample);
        if (userSample) {
            setUser(userInfo);
        }

        if (HttpStatusCode) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다');
                    }
                    return response.json();
                })
                .then(responseData => {
                    setData(responseData.community);
                })
                .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
        }
    }, [code]);

    const [community, setCommunity] = useState(data);

    useEffect(() => {
        setCommunity(data);
    }, [data]);

    // 입력 필드값이 변경 될 때마다 호출하는 함수
    const onChange = (event) => {
        const { value, name } = event.target;
        setCommunity(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [isLoading, setIsLoading] = useState(false);
    // 수정 버튼 클릭 핸들러
    const handleButtonClick = () => {
        setIsLoading(true);

        const updatedData = {
            ...community,
            code: data.code
        };

        // 공지사항에 글을 작성할 수 있는지 여부를 판단
        if (community.category === 'notice' && !user.is_admin) {
            alert("권한이 없습니다. 공지사항에 글을 작성할 수 있는 권한이 필요합니다.");
            setIsLoading(false);
            return;
        }

        if (!community.category) {
            alert("카테고리 선택은 필수입니다.")
            setIsLoading(false);
            return;
        }

        // 서버로 데이터 전송
        const url = `${process.env.REACT_APP_SERVER_URL}/community?command=update`;
        console.log('Sending request to:', url);
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    navigate(`/community/${community.category}/detail?command=read/detail&code=${data.code}&category=${community.category}`);
                } else {
                    console.log('데이터 전송 실패');
                    setIsLoading(false);
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Box id='input-container'>
                <div>
                    <Select value={community.category || data.category} variant='flushed' w='200px' padding='30px'
                        onChange={(e) => setCommunity({ ...community, category: e.target.value })} >
                        <option disabled value=''>게시판 선택</option>
                        <option value='notice'>공지사항</option>
                        <option value='chat'>잡담</option>
                        <option value='recommend'>추천</option>
                    </Select>
                </div>
                <VStack>
                    <Input type="text" name='title' defaultValue={community.title || data.title} onChange={onChange} placeholder='제목을 입력하세요' size='sm' bg='white' w='1400px' h="50px" marginTop='5px' />
                    <Textarea name='content' defaultValue={community.content || data.content} onChange={onChange} placeholder='내용을 입력하세요.' size='sm' w='1400px' h='1000px' />
                    <Button onClick={handleButtonClick} w='100px' bg='#e0ccb3' marginTop='40px' _hover={{ color: '#fffbf0' }} marginBottom='50px'>수정하기</Button>
                </VStack>
            </Box>
        </>
    );
};

export default UpdateCommunity;