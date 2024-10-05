import {AuthSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuthUser, getCsrfToken, loginAdmin} from "src/entities/Auth";
import {sendLoginOtp} from "../services/sendLoginOtp"
import {sendRegisterOtp} from "../services/sendRegisterOtp"
import {checkLoginOTP} from "../services/checkLoginOTP"
import {checkRegisterOTP} from "../services/checkRegisterOTP"

const initialState: AuthSchema = {
    data: {
        unauthorized: false,
        notFound: false,
        csrfToken: '',
        loginErrors: undefined,
        isLogging: false,
        isFetching: false,
        isSendingOTP: false,
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
            .addCase(sendLoginOtp.fulfilled, (state, action) => {
                state.data.isSendingOTP = false
            })
            .addCase(sendLoginOtp.pending, (state, action) => {
                state.data.isSendingOTP = true
            })
            .addCase(sendLoginOtp.rejected, (state, action) => {
                // @ts-ignore
                state.data.isSendingOTP = false
            })
            .addCase(sendRegisterOtp.fulfilled, (state, action) => {
                state.data.isSendingOTP = false
            })
            .addCase(sendRegisterOtp.pending, (state, action) => {
                state.data.isSendingOTP = true
            })
            .addCase(sendRegisterOtp.rejected, (state, action) => {
                // @ts-ignore
                state.data.isSendingOTP = false
            })
            .addCase(checkLoginOTP.fulfilled, (state, action) => {
                state.data.isCheckingOTP = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(checkLoginOTP.pending, (state, action) => {
                state.data.isCheckingOTP = true
            })
            .addCase(checkLoginOTP.rejected, (state, action) => {
                // @ts-ignore
                state.data.isCheckingOTP = false
                // @ts-ignore
                state.data.otpErrors = action.payload
            })
            .addCase(checkRegisterOTP.fulfilled, (state, action) => {
                state.data.isCheckingOTP = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(checkRegisterOTP.pending, (state, action) => {
                state.data.isCheckingOTP = true
            })
            .addCase(checkRegisterOTP.rejected, (state, action) => {
                // @ts-ignore
                state.data.isCheckingOTP = false
                // @ts-ignore
                state.data.otpErrors = action.payload
            })
    }
})

export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice
