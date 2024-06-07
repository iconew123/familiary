import { Heading } from '@chakra-ui/layout';
import { Button, Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom';

const CommunityRecommend = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 8;

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const fetchData = (page) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/recommend`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length) {
                    setData(data);
                    setTotalPages(Math.ceil(data.length / itemsPerPage));
                    if (data.length > 0) {
                        setCategory(data[0].category);
                    }
                } else {
                    setData([]);
                    setTotalPages(1);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setData([]);
                setTotalPages(1);
            });
    };

    const handleCreate = () => {
        const loggedIn = sessionStorage.getItem('isLoggedIn');

        if (!loggedIn) {
            alert("글을 작성하려면 로그인이 필요합니다.");
            return;
        }
        navigate('/community/create?command=create');
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <Box>
            <Heading textAlign='center' marginBottom='20px' fontFamily="'Nanum Gothic', cursive">
                    추천 게시판
                </Heading>
                <Box display='flex' alignItems='center' justifyContent='center'>
                <Table width='800px'>
                        <Thead>
                            <Tr>
                                <Th fontFamily="'Nanum Gothic', cursive">제목</Th>
                                <Th fontFamily="'Nanum Gothic', cursive">작성자</Th>
                                <Th fontFamily="'Nanum Gothic', cursive">작성일</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td fontFamily="'Nanum Gothic', cursive">
                                            <Link to={`detail?command=read/detail&code=${item.code}&category=${item.category}`}>
                                                {item.title}
                                            </Link>
                                        </Td>
                                        <Td fontFamily="'Nanum Gothic', cursive">{item.userNickName}</Td>
                                        <Td fontFamily="'Nanum Gothic', cursive">{item.regDate}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="3" fontFamily="'Nanum Gothic', cursive">데이터가 없습니다</Td>
                                </Tr>
                            )}
                        </Tbody>
                        <Tfoot></Tfoot>
                    </Table>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                    <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>
                        이전
                    </Button>
                    <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
                        다음
                    </Button>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='center' marginTop='20px'>
                    <Button onClick={handleCreate} w="100px" bg="#e0ccb3" _hover={{ color: '#fffbf0' }}>
                        작성하기
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CommunityRecommend;