import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
// import {setDate} from "date-fns";

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
    const {data} = await axios.get('/appointments');
    return data;
});

export const fetchAppointmentsByEmployer = createAsyncThunk('appointments/fetchAppointmentsByEmployer', async (params) => {
   const {data} = await axios.get('/appointments/employer/' + params);
   let indApp = {};
   data.forEach(el => {
       let dateTime = new Date(el.dateTime)
       let day = (dateTime).toLocaleDateString('ru-Ru')
       let time = (dateTime).toLocaleTimeString('ru-Ru');
       let timeEl = {[time]: el}
       indApp[day] = timeEl;
   });

       // .catch((err)=> console.log(err)).then(res => {
        // res.data.map(el => {
        //     let idx = (new Date(el.dateTime).toLocaleString('ru-RU')).replace('09:', '9:'); //28.05.2023, 11:00:00 //TODO поменять на странице календаря, тут убрать 09
        //     dataWithTimeIndex[idx] = el;
        // })
        // console.log(dataWithTimeIndex);
        // return dataWithTimeIndex;
    console.log(indApp)
        return {data: data, indexAppointments: indApp};
    // });

});


// получить события календаря по сотруднику
export const fetchEventsByEmployer = createAsyncThunk('appointments/fetchEventsByEmployer', async (params) => {
    const {data} = await axios.get('/events/employer/' + params);
    return {data: data, emp_id: params};
});


const initialState = {
    appointments: {
      indAppointments : {},
      items: [],
      status: 'loading',
    },
    events: {
        status: 'loading',
        items: {}// { id1: [], id2: [] }
    }
};

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {//
    },
    extraReducers: {
        [fetchAppointments.pending]: (state) => {
            state.appointments.items = [];
            state.appointments.status = 'loading';
        },
        [fetchAppointments.fulfilled]: (state, action) => {
            state.appointments.items = action.payload;
            state.appointments.status = 'loaded';
        },
        [fetchAppointments.rejected]: (state) => {
            state.appointments.items = [];
            state.appointments.status = 'error';
        },
        //по сотруднику
        [fetchAppointmentsByEmployer.pending]: (state) => {
            state.appointments.items = [];
            state.appointments.status = 'loading';
        },
        [fetchAppointmentsByEmployer.fulfilled]: (state, action) => {
            state.appointments.items = action.payload.data;
            state.appointments.indAppointments = action.payload.indexAppointments;
            state.appointments.status = 'loaded';
        },
        [fetchAppointmentsByEmployer.rejected]: (state) => {
            state.appointments.items = [];
            state.appointments.status = 'error';
        },
        //события по сотруднику
        [fetchEventsByEmployer.pending]: (state) => {
            state.events.items = [];
            state.events.status = 'loading';
        },
        [fetchEventsByEmployer.fulfilled]: (state, action) => {
            state.events.items[action.payload.emp_id] = action.payload.data;
            state.events.status = 'loaded';
        },
        [fetchEventsByEmployer.rejected]: (state) => {
            state.events.items = [];
            state.events.status = 'error';
        },
    },
});


export const appointmentsReducer = appointmentsSlice.reducer;
