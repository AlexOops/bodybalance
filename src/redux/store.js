import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";
import {authReducer} from "./slices/auth";
import {modalReducer} from "./slices/modal";



const store = configureStore({
    reducer: {
        services: servicesReducer,
        auth: authReducer,
        modal: modalReducer,
    },

});

export default store;