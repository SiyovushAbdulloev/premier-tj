import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const storeSerieSeason = createAsyncThunk(
    'serieSeason/storeSerieSeason',
    async (data: {
        data: any,
        serie: number
    }, {rejectWithValue, getState}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            const response = await fetch(APP_URL + `/api/admin/series/${data.serie}/serie-seasons`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: data.data,
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
