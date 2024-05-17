import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";

const roueter = createBrowserRouter([
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
        path:"/user",
        element: <Root />,
        children:[
            {
                path:"",
                element:<>
                    <h4>user pages</h4>
                </>
            }
        ]
    },
],{
    basename: "/familiary",
});

export default roueter;