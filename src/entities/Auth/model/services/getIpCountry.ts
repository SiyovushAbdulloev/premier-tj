import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCsrfToken} from "src/entities/Auth";

export const getIpCountry = createAsyncThunk(
    'auth/getIpCountry',
    async (data: string, {rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            const response = await fetch(`http://ip-api.com/json/${data}`)

            if (!response.ok) {
                // @ts-ignore
                const data = await response.json()
                if (data.errors) {
                    return rejectWithValue(data.errors)
                }
                return rejectWithValue(JSON.parse(data.message))
            } else {
                return await response.json()
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
