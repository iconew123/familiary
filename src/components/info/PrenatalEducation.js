import { Heading } from '@chakra-ui/layout';
import { Button, SimpleGrid, Text, Tabs, TabList, Tab, TabIndicator } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/card';
import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

const PrenatalEducation = () => {
    const [PrenatalEducationVideoList, setPrenatalEducationVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('태교 음악');
    const [currentTab, setCurrentTab] = useState(0);

    const pageCount = useRef(1);

    const fetchVideos = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?&query=${search}&page=${page}&size=6`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_VIDEO_API_KEY}`,
                },
            }
        );
        const data = await response.json();

        pageCount.current = data.meta.pageable_count % 6 > 0
            ? Math.floor(data.meta.pageable_count / 6) + 1
            : Math.floor(data.meta.pageable_count / 6);
        pageCount.current = Math.ceil(data.meta.pageable_count / 5);

        setPrenatalEducationVideoList(data.documents);
    }

    useEffect(() => {
        fetchVideos();
    }, [page, search])

    const handleTabChange = (index) => {
        setCurrentTab(index);
        setSearch(index === 0 ? '태교 음악' : '임산부 운동 임산부 유산소 임산부 스트레칭 임산부 요가');
        setPage(1);
    }

    return (
        <>
            <Box>
                <Tabs isFitted position='relative' variant='unstyled' mb='20px'>
                    <TabList>
                        <Tab onClick={() => handleTabChange(0)}>태교</Tab>
                        <Tab onClick={() => handleTabChange(1)}>운동</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                </Tabs>

                <SimpleGrid spacing={4} templateColumns='repeat(3, 1fr)' justifyContent="center" px={4}>
                    {PrenatalEducationVideoList.map((video, index) => (
                        <Card key={index} width="450px" mx="auto">
                            <a href={video.url}>
                                <CardHeader minHeight="100px">
                                    <Heading as='h3' size='md' noOfLines={2}>{(page - 1) * 6 + index + 1}. {video.title}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Image
                                        width="100%"
                                        height="230px"
                                        objectFit="cover"
                                        src={video.thumbnail}
                                        alt={`Thumbnail of ${video.title}`}
                                    />
                                    <Text mt='30px'>{video.author}</Text>
                                </CardBody>
                                <CardFooter></CardFooter>
                            </a>
                        </Card>
                    ))}
                </SimpleGrid>
                <Box display="flex" justifyContent="center" mt={4}>
                    <HStack>
                        <Button
                            bg='#e0ccb3'
                            _hover={{ backgroundColor: '#f2dbc2' }}
                            isDisabled={page === 1}
                            onClick={() => setPage(page - 1)}
                        >
                            {'<'}
                        </Button>
                        {Array.from({ length: Math.min(pageCount.current, 5) }, (_, index) => (
                            <Button
                                key={index}
                                bg='#e0ccb3'
                                _hover={{ backgroundColor: '#f2dbc2' }}
                                color={page === index + 1 + (page > 5 ? page - 5 : 0) ? "#fffbf0" : ''}
                                onClick={() => setPage(index + 1 + (page > 5 ? page - 5 : 0))}
                            >
                                {index + 1 + (page > 5 ? page - 5 : 0)}
                            </Button>
                        ))}
                        <Button
                            bg='#e0ccb3'
                            _hover={{ backgroundColor: '#f2dbc2' }}
                            isDisabled={page % 5 === 0 || page * 5 >= pageCount.current}
                            onClick={() => setPage(Math.min(page + 1, Math.ceil(pageCount.current / 5)))}
                        >
                            {'>'}
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </>
    );
}

export default PrenatalEducation;