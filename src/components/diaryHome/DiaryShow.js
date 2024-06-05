import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Icon, Image, Button } from '@chakra-ui/react';
import { FaListAlt, FaImage } from 'react-icons/fa';

const DiaryShow = () => {
    const { babycode, id } = useParams();
    const [contentType, setContentType] = useState('text');
    const [contentData, setContentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchContent(contentType, currentPage);
    }, [contentType, currentPage]);

    const handleIconClick = (type) => {
        setContentType(type);
        setCurrentPage(1); // 페이지 번호를 초기화합니다.
    };

    const fetchContent = (type, page) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/diary?command=${type === 'text' ? 'diarylist' : 'imagelist'}&babycode=${babycode}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                setContentData(data.slice(start, end));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setContentData([]);
            });
    };

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => prevPage + direction);
    };

    const linkStyle = {
        color: 'blue', // 원하는 색상으로 변경
        textDecoration: 'none', // 밑줄 제거
    };

    const renderPagination = () => {
        return (
            <Box display="flex" justifyContent="center" mt="20px">
                <Button onClick={() => handlePageChange(-1)} disabled={currentPage === 1} mr="10px">
                    이전
                </Button>
                <Button onClick={() => handlePageChange(1)} disabled={contentData.length < itemsPerPage}>
                    다음
                </Button>
            </Box>
        );
    };

    return (
        <ChakraProvider>
            <Box textAlign="center" p="50px" bg="#fdf8f3" minHeight="100vh">
                <Box display="flex" justifyContent="center" mb="20px">
                    <Icon as={FaListAlt} boxSize="50px" mx="10px" onClick={() => handleIconClick('text')} cursor="pointer" />
                    <Icon as={FaImage} boxSize="50px" mx="10px" onClick={() => handleIconClick('image')} cursor="pointer" />
                </Box>

                {contentData.length > 0 && contentType === 'text' ? (
                    <Box overflowX="auto">
                        <Table variant="simple" size="lg" bg="white" borderRadius="md" boxShadow="md">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" color="brown" fontSize="24px" textAlign="center">날짜</Th>
                                    <Th fontWeight="bold" color="brown" fontSize="24px" textAlign="center">제목</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {contentData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td textAlign="center" fontSize="20px">{item.date}</Td>
                                        <Td textAlign="center" fontSize="20px"><Link style={linkStyle} to={`/diary/${item.date}/${babycode}/${id}`}>{item.title}</Link></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ) : contentData.length > 0 && contentType === 'image' ? (
                    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="30px">
                        {contentData.map((item, index) => (
                            <Box key={index} mb="20px">
                                <Link to={`/diary/${item.Date}/${babycode}/${id}`} key={index}>
                                    <Image src={item.imgurl} boxSize="350px" objectFit="cover" />
                                </Link>
                            </Box>
                        ))}
                    </Box>
                ) : null}

                {renderPagination()}
            </Box>
        </ChakraProvider>
    );
};

export default DiaryShow;
