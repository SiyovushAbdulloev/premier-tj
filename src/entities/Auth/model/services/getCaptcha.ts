import {createAsyncThunk} from "@reduxjs/toolkit";
import {getCsrfToken} from "src/entities/Auth";
import {APP_URL} from "src/shared/constants/api";

export const getCaptcha = createAsyncThunk(
    'auth/getCaptcha',
    async (data: string|null, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())
            let url = APP_URL + '/api/captcha/generate';

            if (data) {
                url += `?key=${data}`
            }

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const response = await fetch(url, {
                method: 'GET',
                headers: {
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
                return await response.json()
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
