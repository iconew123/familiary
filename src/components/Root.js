import React from 'react';
import Header from './module/Header';
import { Outlet } from 'react-router-dom';
import Footer from './module/Footer';
import { Grid } from '@chakra-ui/react';

const Root = () => {
    return (
        <Grid templateRows={"160px auto 80px"} minH={"120vh"} maxW={"100vw"} bg={'rgb(255, 250, 240)'}>
            <Header />
            <Outlet />
            <Footer />
        </Grid>
    );
};

export default Root;