import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import staticData from "../staticData";

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const {data} = await axios.get('/services');
    return data;
});

export const fetchServicesByRating = createAsyncThunk('services/fetchServicesByRating', async () => {
    const {data} = await axios.get('/services/popular').catch(() => staticData);
    if (Array.isArray(data) && data.length > 0) {
        return data;
    }
    //вернем тестовые данные если подключение не удалось
    return staticData;
});


const initialState = {
    services: {
        items: [],
        status: 'loading',
        selectedService: {
            name: null,
            id: null
        }
    },
};

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setSelectedService: (state, action) => {
            state.services.selectedService = action.payload;
        },
    },
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

export const selectedService = (state) => state.services.services.selectedService;
export const servicesReducer = servicesSlice.reducer;

//экшены
export const {setSelectedService} = servicesSlice.actions;