import { useState, useEffect } from 'react';

export const useSession = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isSelectedBaby, setIsSelectedBaby] = useState(false);
    const [babyInfo, setBabyInfo] = useState(null);

    useEffect(() => {
        const selectedBaby = sessionStorage.getItem('isSelectedBaby');
        const baby = sessionStorage.getItem('babyInfo');
        if (selectedBaby ==='true' && baby) {
            setBabyInfo(JSON.parse(baby));
        }
    }, []);

    const enrollStatus = (baby) => {
        sessionStorage.setItem('isSelectedBaby', 'true');
        sessionStorage.setItem('babyInfo', JSON.stringify(baby));
        setIsSelectedBaby(true);
        setBabyInfo(baby);
    }

    const cancelStatus = () => {
        sessionStorage.removeItem('babyInfo');
        sessionStorage.removeItem('isSelectedBaby');
        setIsSelectedBaby(false);
        setUserInfo(null);
    }

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

    const getUserId = () => {
        return userInfo ? userInfo.id : null;
    };

    return { isLoggedIn, userInfo, loginStatus, logoutStatus, getUserId, enrollStatus, cancelStatus };
};