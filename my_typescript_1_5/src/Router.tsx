import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Home from "./screens/Home";
import About from "./screens/About";
import Root from "./screens/Root";
import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import User from "./screens/users/User";
import Followers from "./screens/users/Followers";

import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,  //App.js의 역할
        children: [
            {
                path: "",
                element: <Home/> ,
                errorElement:<ErrorComponent/>  //오류 발생시 <ErrorComponent/>를 throw함
            },
            {
                path: "about",
                element: <About />
            },
            {
                path:"user/:userId",    
                //':'다음에 뭘 쓰냐에 따라 useParams()의 'parameter'에 대한 키가 달라짐(useParams().userId 이렇게 써야 함)
                element: <User/>,
                children:[
                    {
                        path:"followers",
                        element:<Followers/>
                    }
                    //children 기능 : 
                    //1. 자동으로 부모의 url을 기준으로 덧붙음
                    //2. 부모의 컴포넌트와 함께 렌더링 됨 (Outlet)
                ]
                // children:[
                //     {
                //         path:":userId",
                //         element:<User/>
                //     }
                // ] 이렇게 안 하는 이유 => 'user'가 'path'인 컴포넌트(라우트)가 없기 때문, 있다면 이렇게 해야됨
            },

            {
                path:"coins",
                element:<Coins/>,
            },

            {
                path:"coins/:coinId",
                element:<Coin/>,
                children:[
                    {
                        path:"price",
                        element:<Price/>
                    },
                    {
                        path:"chart",
                        element:<Chart/>
                    }

                ]
            }
            //Outlet 안 쓴다면 children이 아닌 그냥 따로 동등한 차원의 원소를 써야함
        ],
        errorElement:<NotFound/>    //잘못된 path 입력 시 해당 컴포넌트(라우트)로 이동
    }
]);


export default router;

//router함수가 App.js의 컴포넌트 역할 (Router.tsx는 App.js의 역할)
//해당 router함수는 index에서 import됨