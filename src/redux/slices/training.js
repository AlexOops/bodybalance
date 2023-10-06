import axios from "../../axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchTraining = createAsyncThunk('/training/fetchTraining', async () => {
    const {data} = await axios.get('/training');
    if (Array.isArray(data) && data.length > 0) {
        return data;
    }
})

// export const fetchVideos = createAsyncThunk('/training/fetchVideos', async (id) => {
//     const {data} = await axios.get(`/training/${id}`);
//     if (Array.isArray(data) && data.length > 0) {
//         return data;
//     }
// })

const initialState = {
    training: {
        items: [],
        // name: '',
        // description: '',
        status: 'loading'
    },
    //
    // videos: {
    //     items: [],
    //     status: 'loading'
    // }
}

const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        // setName: (state, action) => {
        //     state.training.name = action.payload
        // },
        // setDescription: (state, action) => {
        //     state.training.description = action.payload
        // }
    },
    extraReducers: {
        [fetchTraining.pending]: (state) => {
            state.training.items = [];
            state.training.status = 'loading';
        },
        [fetchTraining.fulfilled]: (state, action) => {
            state.training.items = action.payload;
            state.training.status = 'loaded';
        },
        [fetchTraining.rejected]: (state) => {
            state.training.items = [];
            state.training.status = 'error';
        }
    }
});

// export const {setName, setDescription} = trainingSlice.actions;
export const trainingReducer = trainingSlice.reducer;