import { Heading } from '@chakra-ui/layout';
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react'

const CommunityNotice = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL.replace('https', 'http')}/community?command=read/notice`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setData(data);
            })
            .catch(error => {
                console.error('데이터를 가져오는 중 에러 발생', error);
            });
    }, []);

    return (
        <>
            <Box h='auto' w='100%'>
                <Heading>
                    공지사항
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
                                <a href={`detail?command=read/detail&code=${item.code}`}><Td>{item.title}</Td></a>
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

export default CommunityNotice;