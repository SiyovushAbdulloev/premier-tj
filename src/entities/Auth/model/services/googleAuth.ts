import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const googleAuth = createAsyncThunk(
    'auth/googleAuth',
    async (data: {
        code: string,
        scope: string,
        authuser: string,
        prompt: string
    }, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const response = await fetch(APP_URL + `/api/social-auth/google/callback?code=${data.code}&scope=${data.scope}&authuser=${data.authuser}&prompt=${data.prompt}`, {
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
                return rejectWithValue(data.message)
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
