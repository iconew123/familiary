import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const GovernmentSupport = () => {
    const fontFamily = { fontFamily: "'Nanum Gothic', cursive" };


    const [data, setData] = useState([]);
    const API_KEY = `${process.env.REACT_APP_API_KEY}`; // API 키를 설정합니다.
    const API_URL = `https://openapi.gg.go.kr/BrthspprtMnychldprvtrtbz?KEY=${API_KEY}&Type=json`; // API 요청 URL을 설정합니다.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                console.log(json);

                setData(json.BrthspprtMnychldprvtrtbz[1].row);
                // 데이터를 'BrthspprtMnychldprvtrtbz' 배열에 있는 'row' 속성으로 설정합니다.
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [API_URL]);

    return (
        <>
            <Box width="800px" margin="auto" align='center'> {/* 테이블을 중앙에 정렬하기 위해 Box 컴포넌트로 감쌉니다. */}
                <Text fontSize='4xl' fontFamily="'Nanum Gothic', cursive" as='b'>경기도 양육비 지원현황</Text>
                <React.Fragment>
                    <Table size='sm' variant="simple" boxShadow="md" marginTop='40px'>
                        <Thead>
                            <Tr>
                                <Th fontSize="lg" width="10%" fontFamily="'Nanum Gothic', cursive">지역</Th>
                                <Th fontSize="lg" width="16%" fontFamily="'Nanum Gothic', cursive">첫째 지원금</Th>
                                <Th fontSize="lg" width="16%" fontFamily="'Nanum Gothic', cursive">둘째 지원금</Th>
                                <Th fontSize="lg" width="16%" fontFamily="'Nanum Gothic', cursive">셋째 지원금</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.length > 0 && data.map((item, index) => (
                                (item.BIZ_NM === '출산장려금' || item.BIZ_NM === '출산축하금' || item.BIZ_NM === '출산지원금' || item.BIZ_NM === '출생축하금') && (
                                    <Tr key={index}>
                                        <Td fontFamily="'Nanum Gothic', cursive" width="10%">{item.SIGUN_NM}</Td>
                                        <Td fontFamily="'Nanum Gothic', cursive" width="16%">{item.CHILD_1_SPORTAMT_DTLS}</Td>
                                        <Td fontFamily="'Nanum Gothic', cursive" width="16%">{item.CHILD_2_SPORTAMT_DTLS}</Td>
                                        <Td fontFamily="'Nanum Gothic', cursive" width="16%">{item.CHILD_3_SPORTAMT_DTLS}</Td>
                                    </Tr>
                                )
                            ))}

                        </Tbody>
                    </Table>
                </React.Fragment>
            </Box>
        </>
    );
}

export default GovernmentSupport;
