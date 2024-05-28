import React from 'react';
import Header from './module/Header';
import { Outlet } from 'react-router-dom';
import Footer from './module/Footer';
import { Grid } from '@chakra-ui/react';

const Root = () => {
    return (
        <Grid templateRows={"160px auto 180px"} minH={"100vh"} maxW={"100vw"}>
            <Header />
            <Outlet />
            <Footer />
        </Grid>
    );
};

export default Root;