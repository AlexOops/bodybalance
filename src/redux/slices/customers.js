import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
import staticData from "../staticData";

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const {data} = await axios.get('/customers/auth');
    if(Array.isArray(data) && data.length > 0){
        return data;
    }
    return staticData;
});

const initialState = {
    customers: {
      items: [],
      status: 'loading',
    },
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        //
    },
    extraReducers: {
        [fetchCustomers.pending]: (state) => {
            state.customers.items = [];
            state.customers.status = 'loading';
        },
        [fetchCustomers.fulfilled]: (state, action) => {
            state.customers.items = action.payload;
            state.customers.status = 'loaded';
        },
        [fetchCustomers.rejected]: (state) => {
            state.customers.items = [];
            state.customers.status = 'error';
        },
    },
});


export const customersReducer = customersSlice.reducer;

//экшены
// export const {setSelectedService} = servicesSlice.actions;