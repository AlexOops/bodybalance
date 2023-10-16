import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const {data} = await axios.get('/services');
    return data;
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
        }
    },
});

export const selectedService = (state) => state.services.services.selectedService;
export const servicesReducer = servicesSlice.reducer;

//экшены
export const {setSelectedService} = servicesSlice.actions;