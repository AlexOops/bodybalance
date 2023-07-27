import axios from "../../axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchConsultationRecords = createAsyncThunk('admin/fetchConsultationRecords', async () => {
    const {data} = await axios.get('/admin/consultations');

    if (Array.isArray(data) && data.length > 0) {
        return data;
    }
});

const initialState = {
    consultationRecords: {
        items: [],
        status: 'loading',
    }
}

const consultationRecordsSlice = createSlice({
    name: 'consultationRecords',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchConsultationRecords.pending]: (state) => {
            state.consultationRecords.items = [];
            state.consultationRecords.status = 'loading';
        },
        [fetchConsultationRecords.fulfilled]: (state, action) => {
            state.consultationRecords.items = action.payload;
            state.consultationRecords.status = 'loaded';
        },
        [fetchConsultationRecords.rejected]: (state) => {
            state.consultationRecords.items = [];
            state.consultationRecords.status = 'error';
        },
    }
});

export const consultationRecordsReducer = consultationRecordsSlice.reducer;