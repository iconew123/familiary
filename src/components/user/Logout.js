import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../module/SessionComponent';

const Logout = () => {
    const navigate = useNavigate();
    const { logoutStatus } = useSession();

    useEffect(() => {
        logoutStatus();
        navigate('/main');
    }, [logoutStatus, navigate]);

    return null; // 이 컴포넌트는 화면에 아무것도 렌더링하지 않음
};

export default Logout;
