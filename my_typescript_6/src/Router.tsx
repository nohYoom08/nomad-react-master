import { createBrowserRouter } from "react-router-dom";
import Root from "./screens/Root";
import Home from "./screens/Home";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root/>,
        children:[{
            path:"",
            element:<Home/>
        }]
    }
])

export default router;