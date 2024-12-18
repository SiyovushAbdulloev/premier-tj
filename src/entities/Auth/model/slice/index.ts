import {AuthSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuthUser, getCsrfToken, loginAdmin} from "src/entities/Auth";
import {sendLoginOtp} from "../services/sendLoginOtp"
import {sendRegisterOtp} from "../services/sendRegisterOtp"
import {checkLoginOTP} from "../services/checkLoginOTP"
import {checkRegisterOTP} from "../services/checkRegisterOTP"
import {updateProfile} from "../services/updateProfile"
import {google} from "../services/google"
import {googleAuth} from "../services/googleAuth"
import {getIp} from "../services/getIp"
import {getIpCountry} from "../services/getIpCountry"
import {logoutAdmin} from "../services/logoutAdmin"
import {logoutUser} from "../services/logoutUser"
import {getCaptcha} from "../services/getCaptcha"

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
        isUpdatingProfile: false,
        profileErrors: undefined,
        isGoogleAuth: false,
        isLoggingGoogle: false,
        isGettingCountry: false,
        isGettingIP: false,
        isLogouting: false,
        captcha: undefined,
        isGettingCaptcha: false
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
        setOtpErrors: (state, action: PayloadAction<any>) => {
            state.data.otpErrors = action.payload
        }
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
                // @ts-ignore
                state.data.otpErrors = null
            })
            .addCase(sendLoginOtp.pending, (state, action) => {
                state.data.isSendingOTP = true
                // @ts-ignore
                state.data.otpErrors = null
            })
            .addCase(sendLoginOtp.rejected, (state, action) => {
                state.data.isSendingOTP = false
                // @ts-ignore
                state.data.otpErrors = action.payload
            })
            .addCase(sendRegisterOtp.fulfilled, (state, action) => {
                state.data.isSendingOTP = false
                // @ts-ignore
                state.data.otpErrors = null
            })
            .addCase(sendRegisterOtp.pending, (state, action) => {
                state.data.isSendingOTP = true
                // @ts-ignore
                state.data.otpErrors = null
            })
            .addCase(sendRegisterOtp.rejected, (state, action) => {
                state.data.isSendingOTP = false
                // @ts-ignore
                state.data.otpErrors = action.payload
            })
            .addCase(checkLoginOTP.fulfilled, (state, action) => {
                state.data.isCheckingOTP = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(checkLoginOTP.pending, (state, action) => {
                state.data.isCheckingOTP = true
            })
            .addCase(checkLoginOTP.rejected, (state, action) => {
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
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.data.isUpdatingProfile = false
                state.data.profileErrors = undefined
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.data.isUpdatingProfile = true
                state.data.profileErrors = undefined
            })
            .addCase(updateProfile.rejected, (state, action) => {
                // @ts-ignore
                state.data.isUpdatingProfile = false
                // @ts-ignore
                state.data.profileErrors = action.payload
            })
            .addCase(google.fulfilled, (state, action) => {
                state.data.isGoogleAuth = false
            })
            .addCase(google.pending, (state, action) => {
                state.data.isGoogleAuth = true
            })
            .addCase(google.rejected, (state, action) => {
                state.data.isGoogleAuth = false
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.data.isLoggingGoogle = false
                localStorage.setItem('token', action.payload.token)
            })
            .addCase(googleAuth.pending, (state, action) => {
                state.data.isLoggingGoogle = true
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.data.isLoggingGoogle = false
            })
            .addCase(getIp.fulfilled, (state, action) => {
                state.data.isGettingIP = false
            })
            .addCase(getIp.pending, (state, action) => {
                state.data.isGettingIP = true
            })
            .addCase(getIp.rejected, (state, action) => {
                state.data.isGettingIP = false
            })
            .addCase(getIpCountry.fulfilled, (state, action) => {
                state.data.isGettingCountry = false
            })
            .addCase(getIpCountry.pending, (state, action) => {
                state.data.isGettingCountry = true
            })
            .addCase(getIpCountry.rejected, (state, action) => {
                state.data.isGettingCountry = false
            })
            .addCase(logoutAdmin.fulfilled, (state, action) => {
                state.data.isLogouting = false
            })
            .addCase(logoutAdmin.pending, (state, action) => {
                state.data.isLogouting = true
            })
            .addCase(logoutAdmin.rejected, (state, action) => {
                state.data.isLogouting = false
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.data.isLogouting = false
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.data.isLogouting = true
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.data.isLogouting = false
            })
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.data.isGettingCaptcha = false
                state.data.captcha = action.payload
            })
            .addCase(getCaptcha.pending, (state, action) => {
                state.data.isGettingCaptcha = true
            })
            .addCase(getCaptcha.rejected, (state, action) => {
                state.data.isGettingCaptcha = false
            })
    }
})

export const {actions: authActions} = authSlice
export const {reducer: authReducer} = authSlice
