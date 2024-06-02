import { Heading } from '@chakra-ui/layout';
import { Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';

const CommunityNotice = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL.replace('https', 'http')}/community?command=read/notice`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
                // 데이터에서 첫 번째 아이템의 카테고리 정보 가져오기
                if (data.length > 0) {
                    setCategory(data[0].category);
                    console.log(data[0].category);
                }
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);

    const handleCreate = () => {
        // 여기서 사용자가 로그인되어 있는지 확인
        const loggedIn = sessionStorage.getItem('isLoggedIn');

        if (!loggedIn) {
            alert("글을 작성하려면 로그인이 필요합니다.");
            return;
        }
        navigate('/community/create'); // 작성하기 페이지로 이동
    };

    return (
        <>
            <Box>
                <Heading>
                    공지사항
                </Heading>
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
                        <Tfoot></Tfoot>
                    </Table>
                </Box>
                <Button onClick={handleCreate} w="100px" bg="#e0ccb3" _hover={{ color: '#fffbf0' }}>
                    작성하기
                </Button>
            </Box>
        </>
    );
};

export default CommunityNotice;