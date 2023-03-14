import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    const {data} = await axios.get('/services');
    return data;
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
    },
});

export const servicesReducer = servicesSlice.reducer;