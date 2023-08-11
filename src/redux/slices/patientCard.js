import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPatientCards = createAsyncThunk('/customers/fetchPatientCards', async () => {
    const {data} = await axios.get('/admin/customers');
    if (Array.isArray(data) && data.length > 0) {
        return data;
    }
})

const initialState = {
    patients: {
        items: [],
        status: 'loading'
    },

    newPatient: {},
    uploadedAvatarUrl: '',
}

const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setPatientCard: (state, action) => {

            const {userId, patientCard} = action.payload

            state.newPatient[userId] = patientCard
        },

        updateUploadedAvatarUrl: (state, action) => {
            state.uploadedAvatarUrl = action.payload;
        }
    },
    extraReducers: {
        [fetchPatientCards.pending]: (state) => {
            state.patients.items = [];
            state.patients.status = 'loading';
        },
        [fetchPatientCards.fulfilled]: (state, action) => {
            state.patients.items = action.payload;
            state.patients.status = 'loaded';
        },
        [fetchPatientCards.rejected]: (state) => {
            state.patients.items = [];
            state.patients.status = 'error';
        },
    }
})

export const {setPatientCard, updateUploadedAvatarUrl} = patientsSlice.actions;
export const patientsCardReducer = patientsSlice.reducer;