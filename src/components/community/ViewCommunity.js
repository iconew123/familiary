import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ViewCommunity = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code'); // URL에서 code 파라미터 가져오기
    const category = searchParams.get('category'); // URL에서 category 파라미터 가져오기
    const navigate = useNavigate();

    const [data, setData] = useState({});

    useEffect(() => {
        console.log("code: " + code);
        console.log("category: " + category);

        if (code && category) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다');
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log(responseData);
                    setData(responseData.community);  // `community` 객체로 데이터 설정
                })
                .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
        }
    }, [code, category]);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=delete`, {
            method: 'DELETE',
            body: JSON.stringify({ code }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('게시글 삭제 성공');
                    navigate(`/familiary/community/${category}`); // 삭제 후 해당 리스트로 이동
                } else {
                    console.log('게시글 삭제 실패');
                }
            })
            .catch(error => console.error('게시글을 삭제하는 중 에러 발생', error));
    };

    const handleUpdate = () => {
        navigate(`/familiary/community/${category}/update?code=${code}`); // 수정 페이지로 이동
    };

    return (
        <Box padding="20px">
            <VStack spacing="20px">
                <Text fontSize="2xl" fontWeight="bold">{data.title}</Text>
                <Text fontSize="md" color="gray.500">작성자: {data.userNickname}</Text>
                <Text fontSize="lg">{data.content}</Text>
                <Button onClick={handleUpdate} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>수정하기</Button>
                <Button onClick={handleDelete} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>삭제하기</Button>
            </VStack>
        </Box>
    );
};

export default ViewCommunity;