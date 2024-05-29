import { useState, useEffect } from 'react';

export const useSession = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isLoggedIn');
        const user = sessionStorage.getItem('userInfo');
        if (loggedIn === 'true' && user) {
            setIsLoggedIn(true);
            setUserInfo(JSON.parse(user));
        }
    }, []);

    const loginStatus = (user) => {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userInfo', JSON.stringify(user));
        setIsLoggedIn(true);
        setUserInfo(user);
    };

    const logoutStatus = () => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userInfo');
        setIsLoggedIn(false);
        setUserInfo(null);
    };

    return { isLoggedIn, userInfo, loginStatus, logoutStatus };
};