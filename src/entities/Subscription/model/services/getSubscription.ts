import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const getSubscription = createAsyncThunk(
    'subscription/getSubscription',
    async (data: number, {getState, rejectWithValue}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            const response = await fetch(APP_URL + `/api/admin/subscriptions/${data}`, {
                method: 'GET',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include'
            })

            if (!response.ok) {
                // @ts-ignore
                const res = await response.json()
                // return rejectWithValue(data.errors)
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
