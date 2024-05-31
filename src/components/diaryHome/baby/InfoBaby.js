import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../module/SessionComponent';

const InfoBaby = () => {

    const navigate = useNavigate();

    const userSample = sessionStorage.getItem('userInfo');
    const babySample = sessionStorage.getItem('babyInfo');

    const user = JSON.parse(userSample);
    const baby = JSON.parse(babySample);

    const { cancelStatus } = useSession();

    // 삭제하기
    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=delete&code=${baby.code}`, {
            method: 'POST',
        })
            .then(response => {
                if (response.ok) {
                    console.log('데이터 전송 성공');
                    cancelStatus();
                    navigate('/diary');
                } else {
                    console.log('데이터 전송 실패')
                }
            })
            .catch(error => {
                console.error('데이터를 전송하는 중 에러 발생', error);
            });
    };

    // 데이터 받아오기
    const [data, setData] = useState({
        nickname: '',
        name: '',
        gender: '',
        expected_date: '',
        blood_type: '',
        position: ''
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/baby?command=read&baby_code=${baby.code}&user_id=${user.id}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log('데이터 받아오기 성공', data);
                console.log('position : ' + data.position)
            })
            .catch(error => {
                console.error('데이터를 받아오는 중 에러 발생', error);
            });
    }, []);




    const handleOptionClick = (option) => {
        if (option === 'updateBaby') {
            navigate('/baby/update')
        }
    }

    return (
        <>
            <Box
                bg='#fffbf0'
                h='auto'
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection='column'>

                <Text fontSize='4xl' as='b' color='#765d2f' marginTop='30px' marginBottom='15px'>아기 정보</Text>


                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    {data.url ? <Image
                        src={data.url}
                        w='300px'
                        h='200px'
                        alt='Baby Image'
                        marginTop='20px'
                        marginBottom='30px'
                    /> : null}

                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>태명</Text>
                    <Input name='nickname' value={data.nickname} size='lg' bg='white' w='500px' h='60px' isReadOnly />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>이름</Text>
                    <Input name='name' value={data.name} size='lg' bg='white' w='500px' h='60px' isReadOnly />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='65px'>성별</Text>
                    <Input name='gender' value={data.gender == 'M' ? '왕자' : '공주'} size='lg' bg='white' w='500px' h='60px' isReadOnly />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='10px'>출산예정일</Text>
                    <Input name='expected_date' value={data.expected_date} size='lg' bg='white' w='500px' h='60px' isReadOnly />
                </Flex>

                <Flex direction="row" justifyContent="center" alignItems="center" height="auto" >
                    <Text fontSize='xl' as='b' marginRight='50px'>혈액형</Text>
                    <Input name='blood_type' value={data.blood_type} size='lg' bg='white' w='500px' h='60px' isReadOnly />
                </Flex>

                {data.position === 'mother' || data.position === 'father' ?
                    <Flex direction="row" justifyContent="center" alignItems="center" height="auto" marginTop='30px' marginBottom='50px' >
                        <Button onClick={() => handleOptionClick('updateBaby')} marginRight='20px' w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>수정하기</Button>
                        <Button onClick={handleDelete} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>삭제하기</Button>
                    </Flex>
                    : null}
            </Box>
        </>
    );
};

export default InfoBaby;