import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    modals: {
        modalLogin: {
            active: false,
        },
        modalService: {
            active: false,
        },
        modalRegister: {
            active: false,
        },
        modalMessage: {
            active: false,
        },
        modalGallery: {
            active: false,
        },
        modalCustomer: {
            active: false,
        },
        modalNewCustomer: {
            active: false,
        },
        modalNewEmployer: {
            active: false,
        }
    }

    // active: false,
    // body: null // Компонент внутрь модального окна
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal: (state, action) => {
            state.modals[action.payload].active = true;
        },
        closeModal: (state, action) => {
            state.modals[action.payload].active = false;
            // state.body = null;
        },
        active: (state, action) => {
            state.active = action.payload;
        }
    },
    extraReducers: {
    }
});

export const getModalByType = type => (state) => state.modal.modals[type].active;

export const modalReducer = modalSlice.reducer;
// export const selectIsActive = (state, type) => Boolean(state.modal.modals[type]);
// export const selectModalBody = (state) => (state.modal.body);

//вытаскиваем экшены из слайса
export const {active, openModal, closeModal} = modalSlice.actions;
