
import ReactDOM from 'react-dom/client'
import './index.css'
import {AppRouter} from "./AppRouter.tsx";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

      <Provider store={store}>
            <RouterProvider router={AppRouter}/>
      </Provider>
,
)
