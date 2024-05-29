import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import DiaryMain from "./components/diaryHome/DiaryMain";
import CreateBaby from "./components/diaryHome/baby/CreateBaby";
import InfoBaby from "./components/diaryHome/baby/InfoBaby";
import UpdateBaby from "./components/diaryHome/baby/UpdateBaby";
import JoinBabyByCode from "./components/diaryHome/baby/JoinBabyByCode";

import Join from "./components/user/Join";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import MyPage from "./components/user/MyPage";
import UserUpdate from "./components/user/UserUpdate"
import UserDelete from "./components/user/UserDelete"


const router = createBrowserRouter([
    {
        path: "/main",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Main />
            }
        ],
        errorElement: <>
            <h1>오류 페이지입니다.</h1>
        </>
    },
    {
        path: "/user",
        element: <Root />,
        children: [
            {
                path: "join",
                element: <Join />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "logout", // Logout 경로 추가
                element: <Logout />
            },
            {
                path: "myPage",
                element: <MyPage />,
            },

            {
                path: "update",
                element: <UserUpdate />
            },
            {
                path: "delete",
                element: <UserDelete />
            },

        ]
    },
    {
        path: "/baby",
        element: <Root />,
        children: [
            {
                path: "/baby/update",
                element: <UpdateBaby />

            },
            {
                path: "/baby/info",
                element: <InfoBaby />
            },
            {
                path: "/baby/create",
                element: <CreateBaby />
            },
            {
                path: "/baby/join",
                element: <JoinBabyByCode />
            }
        ]
    },
    {
        path: "/diary",
        element: <DiaryMain />
    },
], {
    basename: "/familiary",
});

export default router;