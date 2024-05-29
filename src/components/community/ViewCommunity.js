import React, { useEffect, useState } from 'react';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewCommunity = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
    }, [code]);

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
                    navigate('/');
                } else {
                    console.log('게시글 삭제 실패');
                }
            })
            .catch(error => console.error('게시글을 삭제하는 중 에러 발생', error));
    };

    const handleUpdate = () => {
        navigate(`/community/update&code=${code}`);
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
