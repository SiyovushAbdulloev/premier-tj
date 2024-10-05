import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const sendRegisterOtp = createAsyncThunk(
    'auth/sendRegisterOtp',
    async (data: {phone: string}, {getState, rejectWithValue}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const response = await fetch(APP_URL + '/api/register/otp', {
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
                return rejectWithValue(JSON.parse(data.message))
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