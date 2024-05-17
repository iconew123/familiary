import React from 'react';
import Header from './module/Header';
import { Outlet } from 'react-router-dom';
import Footer from './module/Footer';

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;