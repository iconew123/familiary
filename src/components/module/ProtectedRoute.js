import React from 'react';
import { useSession } from './SessionComponent'; // 실제 경로를 사용하세요
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useSession();

    if (!isLoggedIn) {
        return <Navigate to="/user/login" />;
    }

    return children;
};

export default ProtectedRoute;