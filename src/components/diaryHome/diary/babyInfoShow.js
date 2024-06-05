import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text } from '@chakra-ui/react';

const BabyInfoShow = () => {
    const { babycode } = useParams();
    const [contentData, setContentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = `${process.env.REACT_APP_SERVER_URL}/babyInfo?command=allInfo&code=${babycode}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const body = await response.json();

                if (!Array.isArray(body)) {
                    throw new Error('Invalid response format');
                }

                setContentData(body);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('데이터를 가져오는 중에 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [babycode]);

    const linkStyle = {
        color: 'blue',
        textDecoration: 'none'
    };

    if (loading) {
        return (
            <Box textAlign="center" p="50px" bg="#fdf8f3" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" p="50px" bg="#fdf8f3" height="100vh">
                <p>{error}</p>
            </Box>
        );
    }

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
                                        <Text>{item.height}cm {item.weight}kg</Text>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default BabyInfoShow;
