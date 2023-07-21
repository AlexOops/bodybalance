import axios from "../../axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import staticData from "../staticData";

export const fetchOnlineServices = createAsyncThunk('/online-rehabilitation/fetchOnlineServices', async () => {
    const {data} = await axios.get('/online-rehabilitation');
    if (Array.isArray(data) && data.length > 0) {
        return data;
    }

    return staticData;
})

const initialState = {
    onlineServices: {
        items: [],
        status: 'loading',
    }
}

const onlineServicesSlice = createSlice({
    name: 'onlineServices',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchOnlineServices.pending]: (state) => {
            state.onlineServices.items = [];
            state.onlineServices.status = 'loading';
        },
        [fetchOnlineServices.fulfilled]: (state, action) => {
            state.onlineServices.items = action.payload;
            state.onlineServices.status = 'loaded';
        },
        [fetchOnlineServices.rejected]: (state) => {
            state.onlineServices.items = [];
            state.onlineServices.status = 'error';
        },
    }
});

export const onlineServicesReducer = onlineServicesSlice.reducer;