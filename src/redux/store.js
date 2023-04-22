import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";
import {authReducer} from "./slices/auth";
import {modalReducer} from "./slices/modal";
import {onlineServicesReducer} from "./slices/onlineRehabilitation";
import {trainingReducer} from "./slices/training";

const store = configureStore({
    reducer: {
        services: servicesReducer,
        auth: authReducer,
        modal: modalReducer,
        onlineServices: onlineServicesReducer,
        training: trainingReducer
    },

});

export default store;