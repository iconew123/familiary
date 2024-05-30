import { Heading } from '@chakra-ui/layout';
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const CommunityRecommend = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL.replace('https', 'http')}/community?command=read/recommend`)
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
    
    return (
        <>
            <Box h='auto' w='100%'>
                <Heading>
                    추천게시판
                </Heading>

            </Box>
            <TableContainer>
                <Table variant={"striped"} colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <Tr key={index}>
                                <Td><Link to={`detail?command=read/detail&code=${item.code}&category=${category}`}>{item.title}</Link></Td>
                                <Td>{item.userNickName}</Td>
                                <Td>{item.regDate}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                    <Tfoot></Tfoot>
                </Table>
            </TableContainer>
        </>
    );
};

export default CommunityRecommend;