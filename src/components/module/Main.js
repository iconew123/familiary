import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

const Main = () => {
    return (
        <>

            <Grid
                h='100vh'
                templateAreas={`"adArea hospital guide login"
                                "adArea board board diary"`}
                gridTemplateColumns={'1fr 1fr 1fr 1fr'}
                gap={1}>

                {/* 광고단 */}
                <GridItem w='100%' bg='purple' area={'adArea'}>
                    광고
                </GridItem>

                {/* 병원 정보 */}
                <GridItem w='100%' bg='lightblue' area={'hospital'}>
                    병원INFO
                </GridItem>

                {/* 임산부 가이드 */}
                <GridItem w='100%' bg='lightpink' area={'guide'}>
                    임산부 가이드
                </GridItem>

                {/* 로그인 */}
                <GridItem w='100%' bg='white' area={'login'}>
                    로그인
                </GridItem>

                {/* 다이어리 */}
                <GridItem w='100%' bg='gray' area={'diary'}>
                    다이어리
                </GridItem>

                {/* 게시판(최신순) */}
                <GridItem w='100%' bg='lightgreen' area={'board'}>
                    게시판(최신순)
                </GridItem>

            </Grid>
            
        </>
    );
};

export default Main;