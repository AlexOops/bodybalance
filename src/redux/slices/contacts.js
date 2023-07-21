import axios from "../../axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchConsultationTopics = createAsyncThunk('contacts/fetchConsultationTopics', async () => {
    const {data} = await axios.get('/contacts');

    if (Array.isArray(data) && data.length > 0) {
        return data;
    }
});

const initialState = {
    consultationTopics: {
        items: [],
        status: 'loading',
    }
}

const consultationTopicsSlice = createSlice({
    name: 'consultationTopics',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchConsultationTopics.pending]: (state) => {
            state.consultationTopics.items = [];
            state.consultationTopics.status = 'loading';
        },
        [fetchConsultationTopics.fulfilled]: (state, action) => {
            state.consultationTopics.items = action.payload;
            state.consultationTopics.status = 'loaded';
        },
        [fetchConsultationTopics.rejected]: (state) => {
            state.consultationTopics.items = [];
            state.consultationTopics.status = 'error';
        },
    }
});

export const consultationTopicsReducer = consultationTopicsSlice.reducer;