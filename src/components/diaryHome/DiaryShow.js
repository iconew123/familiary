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
        // fetch 요청 보내기
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setContentData(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <ChakraProvider>
            <Box textAlign="center" p="50px" bg="#fdf8f3" height="100vh">
                <Box display="flex" justifyContent="center" mb="20px">
                    <Icon as={FaListAlt} boxSize="50px" mx="10px" onClick={() => handleIconClick('text')} cursor="pointer" />
                    <Icon as={FaImage} boxSize="50px" mx="10px" onClick={() => handleIconClick('image')} cursor="pointer" />
                </Box>

                {contentType === 'text' ? ( // 텍스트 모양일 때
                    <Box overflowX="auto">
                        <Table variant="simple" size="lg" bg="white" borderRadius="md" boxShadow="md">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" color="brown" fontSize="24px" textAlign="center">날짜</Th>
                                    <Th fontWeight="bold" color="brown" fontSize="24px" textAlign="center">제목</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {/* 데이터가 있을 때만 테이블 렌더링 */}
                                {contentData && contentData.map((item, index) => (
                                    <Tr key={index}>
                                        <Td textAlign="center" fontSize="20px">{item.date}</Td>
                                        <Td textAlign="center" fontSize="20px"><Link to={`/diary/${item.date}/${babycode}`}>{item.title}</Link></Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ) : ( // 이미지 모양일 때
                    <Box>
                        {/* 데이터가 있을 때만 이미지 렌더링 */}
                        {contentData && contentData.map((item, index) => (
                            <Box key={index} mb="20px">
                                <Link to={`/diary/${item.Date}/${babycode}`} key={index} mb="20px">
                                    <Image src={item.imgurl} alt={`Image ${index}`} />
                                </Link>
                                <Box textAlign="center" fontSize="20px">{item.Date}</Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </ChakraProvider>
    );
};

export default DiaryShow;
