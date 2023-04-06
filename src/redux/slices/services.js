import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import staticData from "../staticData";

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const {data} = await axios.get('/services');
    if(Array.isArray(data) && data.length > 0){
        return data;
    }
    return staticData;
});

export const fetchServicesByRating = createAsyncThunk('services/fetchServicesByRating', async () => {
    const {data} = await axios.get('/services/popular').catch(()=> staticData);
    if(Array.isArray(data) && data.length > 0){
        return data;
    }
    //вернем тестовые данные если подключение не удалось
    return staticData;
});


const initialState = {
    services: {
      items: [],
      status: 'loading'
    },
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchServices.pending]: (state) => {
            state.services.items = [];
            state.services.status = 'loading';
        },
        [fetchServices.fulfilled]: (state, action) => {
            state.services.items = action.payload;
            state.services.status = 'loaded';
        },
        [fetchServices.rejected]: (state) => {
            state.services.items = [];
            state.services.status = 'error';
        },
        //популярные
        [fetchServicesByRating.pending]: (state) => {
            state.services.items = [];
            state.services.status = 'loading';
        },
        [fetchServicesByRating.fulfilled]: (state, action) => {
            state.services.items = action.payload;
            state.services.status = 'loaded';
        },
        [fetchServicesByRating.rejected]: (state) => {
            state.services.items = [];
            state.services.status = 'error';
        },
    },
});

export const servicesReducer = servicesSlice.reducer;