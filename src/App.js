import React from "react";
import './index.scss'

import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch();
    // const isAuth = useSelector(selectIsAuth); // будем добавлять действия если авторизован

    React.useEffect(() => {
        dispatch(fetchAuthMe());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <div className="App">
                <RouterProvider router={router}/>
            </div>
    );
}

export default App;
