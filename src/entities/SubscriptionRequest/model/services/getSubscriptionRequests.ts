import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const getSubscriptionRequests = createAsyncThunk(
    'series/getSubscriptionRequests',
    async (data: {
        page: number
    } | undefined, {getState, rejectWithValue}) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            let uri = `/api/admin/subscription-requests?page=${data?.page}`

            const response = await fetch(APP_URL + uri, {
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
                console.log({data})
                // return rejectWithValue(data.errors)
            } else {
                const res = await response.json()
                return {
                    data: res[0].data,
                    pagination: {
                        current_page: res[0].meta.current_page,
                        last_page: res[0].meta.last_page,
                        per_page: res[0].meta.per_page,
                    }
                }
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
