import { Heading } from '@chakra-ui/layout';
import { Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const CommunityTalk = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL.replace('https', 'http')}/community?command=read/chat`);
                const result = await response.json();
                console.log('Fetched data:', result); // 데이터 로그 출력

                // 데이터 구조 확인
                if (Array.isArray(result)) {
                    console.log('Data is an array with length:', result.length);
                    result.forEach((item, index) => console.log(`Item ${index}:`, item));
                    setData(result);
                } else {
                    console.error('Fetched data is not an array:', result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCreate = () => {
        navigate('/community/create'); // 작성하기 페이지로 이동
    };

    return (
        <>
            <Box>
                <Heading>자유 게시판</Heading>
                <Box>

                    <Table>
                        <Thead>
                            <Tr>
                                <Th>제목</Th>
                                <Th>작성자</Th>
                                <Th>작성일</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Link to={`detail?command=read/detail&code=${item.code}&category=${item.category}`}>
                                                {item.title}
                                            </Link>
                                        </Td>
                                        <Td>{item.userNickName}</Td>
                                        <Td>{item.regDate}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="3">데이터가 없습니다</Td>
                                </Tr>
                            )}
                        </Tbody>
                        <Tfoot />
                    </Table>
                </Box>
                <Box>
                    <Button onClick={handleCreate} w="100px" bg="#e0ccb3" _hover={{ color: '#fffbf0' }}>
                        작성하기
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CommunityTalk;