import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const addToFavourite = createAsyncThunk(
    'mediaContent/addToFavourite',
    async (data: number, {rejectWithValue, getState, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            const response = await fetch(APP_URL + '/api/favourites', {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({type: 'series', 'favourite_id': data}),
                credentials: 'include'
            })

            if (!response.ok) {
                // @ts-ignore
                const res = await response.json()
                return rejectWithValue(res.errors)
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
