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
import DiaryMain, { fetchDiaryDetailInfo } from "./components/diaryHome/DiaryMain";
import ViewCommunity from "./components/community/ViewCommunity";
import DiaryView from "./components/diaryHome/DiaryView";
import DiaryShow from "./components/diaryHome/DiaryShow";
import GovernmentSupport  from "./components/info/GovernmentSupport ";
import HospitalInfo from "./components/info/HospitalInfo";
import PregnancyGuide from "./components/info/PregnancyGuide";
import PrenatalEducation from "./components/info/PrenatalEducation";

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
                path: "/user/join",
                element: <Join />
            },
            {
                path: "/user/login",
                element: <Login />
            },
            {
                path: "/user/logout", // Logout 경로 추가
                element: <Logout />
            },
            {
                path: "/user/myPage",
                element: <MyPage />,
            },
            {
                path: "/user/update",
                element: <UserUpdate />
            },
            {
                path: "/user/delete",
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
                
            },
            {
                path:"/diary/:date/:babycode/:id",
                element: <DiaryView/>
            },
            {
                path:"/diary/show/:babycode/:id",
                element: <DiaryShow />
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
        path: "/community",
        element: <Root />,
        children: [
            {
                path: '/community/chat',
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
            },
            {
                path: '/community/notice/detail',
                element: <ViewCommunity />,
            },
            {
                path: '/community/chat/detail',
                element: <ViewCommunity />,
            },
            {
                path: '/community/recommend/detail',
                element: <ViewCommunity />,
            }
        ]
    }, 
    {
        path: "/info",
        element: <Root />,
        children: [
            {
                path: '/info/guide',
                element: <GovernmentSupport  />,
            }, {
                path: '/info/hospitalInfo',
                element: <HospitalInfo />,
            }, {
                path: '/info/government',
                element: <PregnancyGuide />,
            }, {
                path: '/info/preantalEduation',
                element: <PrenatalEducation />,
            }
        ]
    }
], {
    basename: "/familiary",
});

export default router;