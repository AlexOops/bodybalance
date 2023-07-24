import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";
import {authReducer} from "./slices/auth";
import {modalReducer} from "./slices/modal";
import {onlineServicesReducer} from "./slices/onlineRehabilitation";
import {trainingReducer} from "./slices/training";
import {employersReducer} from "./slices/employers";
import {customersReducer} from "./slices/customers";
import {consultationTopicsReducer} from "./slices/contacts";
import {appointmentsReducer} from "./slices/appointments";

const store = configureStore({
    reducer: {
        services: servicesReducer,
        customers: customersReducer,
        employers: employersReducer,
        auth: authReducer,
        modal: modalReducer,
        onlineServices: onlineServicesReducer,
        training: trainingReducer,
        consultationTopics: consultationTopicsReducer
        appointments: appointmentsReducer,
    },
});

export default store;