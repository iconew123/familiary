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
import DiaryView from "./components/diaryHome/diary/DiaryView";
import DiaryShow from "./components/diaryHome/diary/DiaryShow";
import HospitalInfo from "./components/info/HospitalInfo";
import PregnancyGuideEPU from "./components/info/PregnancyGuideEPU";
import PregnancyGuideEPH from "./components/info/PregnancyGuideEPH";
import PregnancyGuideMPU from "./components/info/PregnancyGuideMPU";
import PregnancyGuideMPH from "./components/info/PregnancyGuideMPH";
import PregnancyGuideLPU from "./components/info/PregnancyGuideLPU";
import PregnancyGuideLPH from "./components/info/PregnancyGuideLPH";
import PrenatalEducation from "./components/info/PrenatalEducation";
import BabyInfoView from "./components/diaryHome/diary/BabyInfoView";
import GovernmentSupport from "./components/info/GovernmentSupport";
import GovernmentSupportMain from "./components/info/GovernmentSupportMain";
import BabyInfoShow from "./components/diaryHome/diary/BabyInfoShow";

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
        path: "user",
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
                path: "logout",
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
        path: "diary",
        element: <Root />,
        children: [
            {
                path: "",
                element: <DiaryMain />
            },
            {
                path: ":date/:babycode/:id",
                element: <DiaryView />
            },
            {
                path: "show/:babycode/:id",
                element: <DiaryShow />
            }
        ]
    },
    {
        path: "babyInfo",
        element: <Root />,
        children: [
            {
                path: "",
                element: <DiaryMain />
            },
            {
                path: ":date/:babycode",
                element: <BabyInfoView />
            },
            {
                path: "show/:babycode",
                element: <BabyInfoShow />
            }
        ]
    },
    {
        path: "baby",
        element: <Root />,
        children: [
            {
                path: "update",
                element: <UpdateBaby />
            },
            {
                path: "info",
                element: <InfoBaby />
            },
            {
                path: "create",
                element: <CreateBaby />
            },
            {
                path: "join",
                element: <JoinBabyByCode />
            }
        ]
    },
    {
        path: "community",
        element: <Root />,
        children: [
            {
                path: "chat",
                element: <CommunityTalk />,
            },
            {
                path: "notice",
                element: <CommunityNotice />,
            },
            {
                path: "recommend",
                element: <CommunityRecommend />,
            },
            {
                path: "create",
                element: <CreateCommunity />,
            },
            {
                path: "update",
                element: <UpdateCommunity />,
            },
            {
                path: "notice/detail",
                element: <ViewCommunity />,
            },
            {
                path: "chat/detail",
                element: <ViewCommunity />,
            },
            {
                path: "recommend/detail",
                element: <ViewCommunity />,
            }
        ]
    },
    {
        path: "info",
        element: <Root />,
        children: [
            {
                path: "guide/EPU",
                element: <PregnancyGuideEPU />,
            },
            {
                path: "guide/EPH",
                element: <PregnancyGuideEPH />,
            },
            {
                path: "guide/MPU",
                element: <PregnancyGuideMPU />,
            },
            {
                path: "guide/MPH",
                element: <PregnancyGuideMPH />,
            },
            {
                path: "guide/LPU",
                element: <PregnancyGuideLPU />,
            },
            {
                path: "guide/LPH",
                element: <PregnancyGuideLPH />,
            }, {
                path: "hospitalInfo",
                element: <HospitalInfo />,
            }, {
                path: "government",
                element: <GovernmentSupport />,
            }, {
                path: "preantalEduation",
                element: <PrenatalEducation />,
            }, {
                path: "governmentMain",
                element: <GovernmentSupportMain />,
            }
        ]
    }
], {
    basename: "/familiary",
});

export default router;
