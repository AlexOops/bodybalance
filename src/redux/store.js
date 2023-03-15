import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";
import {authReducer} from "./slices/auth";


const store = configureStore({
    reducer: {
        services: servicesReducer,
        auth: authReducer,
    }
});

export default store;