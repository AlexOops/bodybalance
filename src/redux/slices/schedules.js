import axios from "../../axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchSchedules = createAsyncThunk('schedules/fetchAll', async () => {
    const {data} = await axios.get('/admin/specialists/schedules');
    return data;
})

const initialState = {
    schedules: {
        items: [],
        status: 'loading',
        error: null //для детального отображения ошибки
    },
}

const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSchedules.pending]: (state) => {
            state.schedules.items = [];
            state.schedules.status = 'loading';
        },
        [fetchSchedules.fulfilled]: (state, action) => {
            state.schedules.items = action.payload;
            state.schedules.status = 'loaded';
        },
        [fetchSchedules.rejected]: (state, action) => {
            state.schedules.items = [];
            state.schedules.status = 'error';
            state.schedules.error = action.error.message;
        },

    }
})

export const schedulesReducer = schedulesSlice.reducer;