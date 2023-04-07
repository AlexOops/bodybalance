import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    date: '2023-03-29',
    times: ['11:00', '12:00'],
    status: 'loading',

};

const datepickerSlice = createSlice({
    name: 'datepicker',
    initialState,
    reducers:{

        setDate: (state, action) => {
            state.date = action
        },
        setTime: (state, action) => {
            state.time = action.payload;
        },
    },
    extraReducers: {
        //
    }
});

export const datepickerReducer = datepickerSlice.reducer;
//actions
export const {setDate, setTime} = datepickerSlice.actions;

