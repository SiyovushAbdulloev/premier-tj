import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCsrfToken} from "src/entities/Auth";

export const getIp = createAsyncThunk(
    'auth/getIp',
    async (data: void, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const response = await fetch('https://api.ipify.org')

            if (!response.ok) {
                // @ts-ignore
                const data = await response.json()
                if (data.errors) {
                    return rejectWithValue(data.errors)
                }
                return rejectWithValue(JSON.parse(data.message))
            } else {
                return await response.text()
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
