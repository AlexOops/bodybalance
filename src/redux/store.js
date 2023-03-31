import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";
import {authReducer} from "./slices/auth";
import {datepickerReducer} from "./slices/datepicker";


const store = configureStore({
    reducer: {
        services: servicesReducer,
        auth: authReducer,
        datepicker: datepickerReducer,
    }
});

export default store;