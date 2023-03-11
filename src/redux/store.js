import { configureStore } from '@reduxjs/toolkit';
import { servicesReducer } from "./slices/services";


const store = configureStore({
    reducer: {
         services: servicesReducer,
    }

});

export default store;