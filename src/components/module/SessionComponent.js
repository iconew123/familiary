import React, { createContext, useContext, useEffect, useState } from 'react';

// // // 세션 상태를 관리할 컨텍스트 생성
// const SessionContext = createContext();

// // 세션 상태를 제공하는 SessionProvider 컴포넌트 생성
// export const SessionProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const loginStatus = () => {
//         // 로그인 상태 업데이트
//         setIsLoggedIn(true);
//     };

//     const logoutStatus = () => {
//         // 로그아웃 상태 업데이트
//         setIsLoggedIn(false);
//     };

//     return (
//         <SessionContext.Provider value={{ isLoggedIn, loginStatus, logoutStatus }}>
//             {children}
//         </SessionContext.Provider>
//     );
// };

// // 세션 정보를 사용할 수 있게 하는 hook 생성
// export const useSession = () => useContext(SessionContext);

export const useSession = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const loginStatus = () => {
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logoutStatus = () => {
        sessionStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return { isLoggedIn, loginStatus, logoutStatus };
};