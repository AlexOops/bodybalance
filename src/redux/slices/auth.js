import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "../../axios";
//Login
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/auth/login', params);
    return data;
});

//Register
export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/auth/register', params);
    return data; //email, password, fullName, avatar
});

//проверка текущей авторизации для App по токену в заголовке
export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/auth/me');
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => { //загрузка
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => { //загружено
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => { //ошибка
            state.status = 'error';
            state.data = null;
        },
        //authMe
        [fetchAuthMe.pending]: (state) => { //загрузка
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => { //загружено
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => { //ошибка
            state.status = 'error';
            state.data = null;
        },
        //register
        [fetchRegister.pending]: (state) => { //загрузка
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action) => { //загружено
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => { //ошибка
            state.status = 'error';
            state.data = null;
        },
    }
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

//вытаскиваем экшены из слайса
export const {logout} = authSlice.actions;
