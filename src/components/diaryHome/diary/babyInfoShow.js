import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Button, Text } from '@chakra-ui/react';

const BabyInfoShow = () => {
    const { babycode } = useParams();
    const [contentType, setContentType] = useState('text');
    const [contentData, setContentData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchContent(contentType, currentPage);
    }, [contentType, currentPage]);

    const handleIconClick = (type) => {
        setContentType(type);
        setCurrentPage(1); // 페이지 번호를 초기화합니다.
    };

    const fetchContent = (type, page) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/babyInfo?command=allInfo&code=${babycode}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setTotalItems(data.length);
                console.log("Total items:", data.length); // 총 항목 수 로그 출력
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const slicedData = data.slice(start, end);
                console.log("Sliced data:", slicedData); // 슬라이스된 데이터 로그 출력
                setContentData(slicedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setContentData([]);
                setTotalItems(0);
            });
    };

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => prevPage + direction);
    };

    const linkStyle = {
        color: 'blue',
        textDecoration: 'none'
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return (
            <Box display="flex" justifyContent="center" mt="20px">
                <Button onClick={() => handlePageChange(-1)} isDisabled={currentPage === 1} mr="10px">
                    이전
                </Button>
                <Button onClick={() => handlePageChange(1)} isDisabled={currentPage >= totalPages}>
                    다음
                </Button>
            </Box>
        );
    };

    return (
        <ChakraProvider>
            <Box textAlign="center" p="50px" bg="#fdf8f3" height="100vh">
                <Box overflowX="auto">
                    <Table variant="simple" size="lg" bg="white" borderRadius="md" boxShadow="md">
                        <Thead>
                            <Tr>
                                <Th fontWeight="bold" color="brown" fontSize="24px" textAlign="center">날짜</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {contentData.map((item, index) => (
                                <Tr key={index}>
                                    <Td textAlign="center" fontSize="20px">
                                        <Link style={linkStyle} to={`/babyInfo/${item.date}/${babycode}`}>{item.date}</Link>
                                        {item.height && item.weight && <Text>{item.height}cm {item.weight}kg</Text>}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
                {renderPagination()}
            </Box>
        </ChakraProvider>
    );
};

export default BabyInfoShow;
