import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import DiaryMain from "./components/diaryHome/DiaryMain";
import CreateBaby from "./components/diaryHome/baby/CreateBaby";
import InfoBaby from "./components/diaryHome/baby/InfoBaby";
import UpdateBaby from "./components/diaryHome/baby/UpdateBaby";
import JoinBabyByCode from "./components/diaryHome/baby/JoinBabyByCode";
import CommunityTalk from "./components/community/CommunityTalk";
import CommunityNotice from "./components/community/CommunityNotice";
import CommunityRecommend from "./components/community/CommunityRecommend";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        children:[
            {
                path:"",
                element: <Main />
            }
        ],
        errorElement: <>
        <h1>오류 페이지입니다.</h1>
    </>
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
            }
        ]
    },
],{
    basename: "/familiary",
});

export default router;