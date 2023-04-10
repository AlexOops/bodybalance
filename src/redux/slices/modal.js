import {createSlice} from '@reduxjs/toolkit';
import {PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    active: false,
    body: null // Компонент внутрь модального окна
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal: (state, action: PayloadAction<JSX.Element>) => {
            state.active = true;
            state.body = action.payload;
        },
        closeModal: (state) => {
            state.active = false;
            state.body = null;
        },
        // active: (state, action) => {
        //     state.active = action.payload;
        // }
    },
    extraReducers: {
    }
});

export const modalReducer = modalSlice.reducer;
export const selectIsActive = (state) => Boolean(state.modal.active);
export const selectModalBody = (state) => (state.modal.body);

//вытаскиваем экшены из слайса
export const {active, openModal, closeModal} = modalSlice.actions;
