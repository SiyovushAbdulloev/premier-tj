import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const updateSubscription = createAsyncThunk(
    'subscription/updateSubscription',
    async (data: {
        id: number,
        name: string,
        description: string,
        price: string,
        duration: string,
        promotional_price: string | null,
        promotional_duration: string | null,
    }, {rejectWithValue, getState}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            const response = await fetch(APP_URL + `/api/admin/subscriptions/${data.id}`, {
                method: 'PUT',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    duration: data.duration,
                    promotional_price: data.promotional_price,
                    promotional_duration: data.promotional_duration,
                }),
                credentials: 'include'
            })

            if (!response.ok) {
                // @ts-ignore
                const res = await response.json()
                return rejectWithValue(res.errors)
            } else {
                const res = await response.json()
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
