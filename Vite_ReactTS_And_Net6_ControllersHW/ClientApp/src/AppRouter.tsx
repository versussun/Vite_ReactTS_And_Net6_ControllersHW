import {createBrowserRouter} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {Post} from "./pages/Post/Post";
import {PostsList} from "./components/PostsList/PostsList";

export const AppRouter= createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/",
                element:<PostsList/>
            },
            {
                path:"posts/add",
                element:<Post isEdit={true}/>
            },
            {
                path:"posts/:id",
                element:<Post isEdit={false}/>
            },
            {
                path:"posts/:id/edit",
                element:<Post isEdit={true}/>
            }

        ]
    },

    {
        path:"/about",
        element:<div>About</div>
    }
])