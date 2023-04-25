import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import staticData from "../staticData";

export const fetchEmployers = createAsyncThunk('employers/fetchEmployers', async () => {
    const {data} = await axios.get('/employers');
    if(Array.isArray(data) && data.length > 0){
        return data;
    }
    return staticData;
});


const initialState = {
    employers: {
      items: [],
      status: 'loading',
      selectedEmployer: {
          name: null ,
          id: null
      }
    },
};

const employersSlice = createSlice({
    name: 'employers',
    initialState,
    reducers: {
        setSelectedEmployer: (state, action) => {
            state.employers.selectedService = action.payload;
        },
    },
    extraReducers: {
        [fetchEmployers.pending]: (state) => {
            state.employers.items = [];
            state.employers.status = 'loading';
        },
        [fetchEmployers.fulfilled]: (state, action) => {
            state.employers.items = action.payload;
            state.employers.status = 'loaded';
        },
        [fetchEmployers.rejected]: (state) => {
            state.employers.items = [];
            state.employers.status = 'error';
        },
    },
});

export const selectedService = (state)=> state.employers.employers.selectedEmployer;
export const employersReducer = employersSlice.reducer;

//экшены
export const {setSelectedEmployer} = employersSlice.actions;