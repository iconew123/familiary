import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import CreateBaby from "./components/diaryHome/baby/CreateBaby";
import InfoBaby from "./components/diaryHome/baby/InfoBaby";
import UpdateBaby from "./components/diaryHome/baby/UpdateBaby";
import JoinBabyByCode from "./components/diaryHome/baby/JoinBabyByCode";
import CommunityTalk from "./components/community/CommunityTalk";
import CommunityNotice from "./components/community/CommunityNotice";
import CommunityRecommend from "./components/community/CommunityRecommend";
import CreateCommunity from "./components/community/CreateCommunity";
import UpdateCommunity from "./components/community/UpdateCommunity";
import Join from "./components/user/Join";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import MyPage from "./components/user/MyPage";
import UserUpdate from "./components/user/UserUpdate";
import UserDelete from "./components/user/UserDelete";
import DiaryMain from "./components/diaryHome/DiaryMain";

const router = createBrowserRouter([
    {
        path: "/",
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
                path: "Join",
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
        path:"/diary",
        element: <Root />,
        children:[
            {
                path:"",
                element: <DiaryMain/>
                
            }
        ]
    },
    {
        path:"/baby",
        element: <Root />,
        children:[
            {
                path:"/baby/update",
                element: <UpdateBaby/>
                
            },
            {
                path:"/baby/info",
                element: <InfoBaby/>
            },
            {
                path:"/baby/create",
                element: <CreateBaby/>
            },
            {
                path:"/baby/join",
                element: <JoinBabyByCode/>
            }
        ]
    },
    {
        path:"/community",
        element: <Root />,
        children:[
            {
                path: '/community/talk',
                element: <CommunityTalk />,
            },
            {
                path: '/community/notice',
                element: <CommunityNotice />,
            },
            {
                path: '/community/recommend',
                element: <CommunityRecommend />,
            },
            {
                path: '/community/create',
                element: <CreateCommunity />,
            },
            {
                path: '/community/update',
                element: <UpdateCommunity />,
            }
        ]
    },
],{
    basename: "/familiary",
});

export default router;