import {Auth} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Auth = {
    unauthorized: false,
    notFound: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUnauthorized: (state, action: PayloadAction<boolean>) => {
            state.unauthorized = action.payload
        },
        setNotFound: (state, action: PayloadAction<boolean>) => {
            state.notFound = action.payload
        },
    }
})

export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice