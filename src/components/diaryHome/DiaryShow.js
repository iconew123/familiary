import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td, Icon, Image } from '@chakra-ui/react';
import { FaListAlt, FaImage } from 'react-icons/fa';

const DiaryShow = () => {
    const { babycode } = useParams();
    const [contentType, setContentType] = useState('text');
    const [contentData, setContentData] = useState(null);

    const handleIconClick = (type) => {
        setContentType(type);
        fetchContent(type);
    };

    const fetchContent = (type) => {
        const url = `${process.env.REACT_APP_SERVER_URL}/diary?command=${type === 'text' ? 'diarylist' : 'imagelist'}&babycode=${babycode}`;
        fetch(url)
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status !== 200) {
                    console.log(body.message);
                    setContentData(null);
                } else {
                    if(body[0].status === 400){
                        setContentData(null);
                    }else{
                        setContentData(body);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setContentData(null);
            });
    };

    return (
        <ChakraProvider>
            <Box textAlign="center" p="50px" bg="#fdf8f3" height="100vh">
                <Box display="flex" justifyContent="center" mb="20px">
                    <Icon as={FaListAlt} boxSize="50px" mx="10px" onClick={() => handleIconClick('text')} cursor="pointer" />
                    <Icon as={FaImage} boxSize="50px" mx="10px" onClick={() => handleIconClick('image')} cursor="pointer" />
                </Box>

                {contentData && contentType === 'text' ? (
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
                                        <Td textAlign="center" fontSize="20px"><Link to={`/diary/${item.date}/${babycode}`}>{item.title}</Link></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ) : contentData && contentType === 'image' ? (
                    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="30px">
                        {contentData.map((item, index) => (
                            <Box key={index} mb="20px">
                                <Link to={`/diary/${item.Date}/${babycode}`} key={index}>
                                    <Image src={item.imgurl} boxSize="350px" objectFit="cover" />
                                </Link>
                            </Box>
                        ))}
                    </Box>
                ) : null}
            </Box>
        </ChakraProvider>
    );
};

export default DiaryShow;
