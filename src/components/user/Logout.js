import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';



const Logout = () => {
    const navigate = useNavigate();
    const { logoutStatus } = useSession();
    const { cancelStatus } = useSession();
    const loggedIn = sessionStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (!loggedIn) {
            navigate('/user/login');
        }
        logoutStatus();
        cancelStatus();
        navigate('/');
    }, [logoutStatus, cancelStatus, navigate]);

    return null;
};

export default Logout;