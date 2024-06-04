import React, { useEffect, useState } from 'react';
import { Box, Button, Code, HStack, Text, Textarea, VStack } from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ViewCommunity = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code'); // URL에서 code 파라미터 가져오기
    const category = searchParams.get('category'); // URL에서 category 파라미터 가져오기
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const userSample = sessionStorage.getItem('userInfo');
        if (userSample) {
            const user = JSON.parse(userSample);
            setUser(user);
            console.log("User ID from session:", user.id);
        }

        console.log("code: " + code);
        console.log("category: " + category);

        if (code && category) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=read/detail&code=${code}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('네트워크 응답이 올바르지 않습니다');
                    }
                    return response.json();
                })
                .then(responseData => {
                    console.log(responseData);
                    setData(responseData.community);  // `community` 객체로 데이터 설정
                    setComments(responseData.comments || []); // 댓글 리스트 설정 (undefined인 경우 빈 배열로 설정)
                    console.log("커뮤니티 User ID:", responseData.community.userNickname);
                })
                .catch(error => console.error('데이터를 가져오는 중 에러 발생', error));
        }
    }, [code, category]);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=delete&code=${code}`, {
            method: 'DELETE',
            body: JSON.stringify({ code }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log('게시글 삭제 성공');
                    navigate(`/community/${category}`); // 삭제 후 해당 리스트로 이동
                } else {
                    console.log('게시글 삭제 실패');
                }
            })
            .catch(error => console.error('게시글을 삭제하는 중 에러 발생', error));
    };

    const handleUpdate = () => {
        navigate(`/community/update?command=update&code=${code}`); // 수정 페이지로 이동
    };

    const isOwner = user && user.nickname === data.userNickname;
    console.log("isOwner:", isOwner);

    // 댓글
    // 댓글 등록하기
    const handleInputComment = (e) => {
        if (!user) {
            console.error('로그인이 필요합니다');
            return;
        }

        const newComment = {
            code: code,
            userId: user.id,
            userNickname: user.nickname,
            content: comment
        };

        console.log("Sending Comment JSON: ", JSON.stringify(newComment)); // 콘솔에 출력

        fetch(`${process.env.REACT_APP_SERVER_URL}/community?command=writeComment`, {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('댓글 등록 실패');
                }
                return response.text(); // 응답 본문을 텍스트로 변환
            })
            .then(text => {
                console.log("Response Text:", text); // 서버 응답 로그
                if (text.trim() === "") {
                    throw new Error('빈 응답');
                }
                const jsonData = JSON.parse(text); // JSON 파싱
                console.log("Response Data:", jsonData); // 새로 추가된 댓글 콘솔에 출력
                setComments(prevComments => [...prevComments, jsonData]);
                setComment(''); // 댓글 입력 필드 초기화
                console.log('댓글 등록 성공');
            })
            .catch(error => console.error('댓글 등록 중 에러 발생', error));
    };

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };


    return (
        <Box padding="20px">
            <VStack spacing="20px">
                <Text fontSize="2xl" fontWeight="bold">{data.title}</Text>
                <Text fontSize="md" color="gray.500">작성자: {data.userNickname}</Text>
                <Text fontSize="lg">{data.content}</Text>
            </VStack>
            <HStack>
                {isOwner && (
                    <>
                        <Button onClick={handleUpdate} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>수정하기</Button>
                        <Button onClick={handleDelete} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>삭제하기</Button>
                    </>
                )}
            </HStack>
            <Box mt="20px" width="100%" backgroundColor='#e0ccb3'>
                <Text fontSize="md" align="left">댓글</Text>
            </Box>
            <Box>
                {comments.map((comment, index) => (
                    <Box key={index} borderBottom="1px solid #ccc" p="10px">
                        <Text fontSize="sm" color="gray.500">{comment.user_nickname}</Text>
                        <Text fontSize="md">{comment.content}</Text>
                    </Box>
                ))}
            </Box>
            <Box>
                <Textarea name='comment' value={comment} onChange={handleInputChange} placeholder='내용을 입력하세요.' size='sm' width="100%" mt="10px" />
                <Button onClick={handleInputComment} w='100px' bg='#e0ccb3' _hover={{ color: '#fffbf0' }}>등록하기</Button>
            </Box>
        </Box>
    );
};

export default ViewCommunity;