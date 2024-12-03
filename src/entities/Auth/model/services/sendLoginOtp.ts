import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const sendLoginOtp = createAsyncThunk(
    'auth/sendLoginOtp',
    async (data: { phone: string, captcha_code: string, captcha_key: string }, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const response = await fetch(APP_URL + '/api/login/otp', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                },
                credentials: 'include'
            })

            if (!response.ok) {
                // @ts-ignore
                const data = await response.json()
                if (data.errors) {
                    return rejectWithValue(data.errors)
                }
                return rejectWithValue(data.message)
            } else {
                const data = await response.json()
                return data
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
