
import { createBrowserRouter } from "react-router-dom"; 
import AuthController from "./Pages/authcontroller";
import Home from "./Pages/home";
import Login from "./Pages/login";


const router=createBrowserRouter([
    {
        element:<Login/>,
        path:"/login"
    },
    {
        path:"/",
        element:<AuthController><Home/></AuthController>
    }
]
)


export default router;