import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    active: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        active: (state, action) => {
            state.active = action.payload;
        }
    },
    extraReducers: {
    }
});

export const modalReducer = modalSlice.reducer;
export const selectIsActive = (state) => Boolean(state.modal.active);

//вытаскиваем экшены из слайса
export const {active} = modalSlice.actions;
