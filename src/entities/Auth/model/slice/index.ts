import {AuthSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuthUser, getCsrfToken, loginAdmin} from "src/entities/Auth";
import {sendEmail} from "../services/sendEmail"
import {checkOTP} from "../services/checkOTP"

const initialState: AuthSchema = {
    data: {
        unauthorized: false,
        notFound: false,
        csrfToken: '',
        loginErrors: undefined,
        isLogging: false,
        isFetching: false,
        isSendingEmail: false,
        isCheckingOTP: false,
        otpErrors: undefined,
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUnauthorized: (state, action: PayloadAction<boolean>) => {
            state.data.unauthorized = action.payload
        },
        setNotFound: (state, action: PayloadAction<boolean>) => {
            state.data.notFound = action.payload
        },
        setCsrfToken: (state, action: PayloadAction<string>) => {
            state.data.csrfToken = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(getCsrfToken.fulfilled, (state, action) => {
            state.data.csrfToken = action.payload ?? ''
        })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload)
                state.data.isLogging = false
            })
            .addCase(loginAdmin.pending, (state, action) => {
                state.data.isLogging = true
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                // @ts-ignore
                state.data.loginErrors = action.payload
                state.data.isLogging = false
            })
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.data.isFetching = false
            })
            .addCase(getAuthUser.pending, (state, action) => {
                state.data.isFetching = true
            })
            .addCase(getAuthUser.rejected, (state, action) => {
                // @ts-ignore
                state.data.isFetching = false
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.data.isSendingEmail = false
            })
            .addCase(sendEmail.pending, (state, action) => {
                state.data.isSendingEmail = true
            })
            .addCase(sendEmail.rejected, (state, action) => {
                // @ts-ignore
                state.data.isSendingEmail = false
            })
            .addCase(checkOTP.fulfilled, (state, action) => {
                state.data.isCheckingOTP = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(checkOTP.pending, (state, action) => {
                state.data.isCheckingOTP = true
            })
            .addCase(checkOTP.rejected, (state, action) => {
                // @ts-ignore
                state.data.isCheckingOTP = false
                // @ts-ignore
                state.data.otpErrors = action.payload
            })
    }
})

export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice
