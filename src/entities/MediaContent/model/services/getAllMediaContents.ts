import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const getAllMediaContents = createAsyncThunk(
    'mediaContent/getAllMediaContents',
    async (data: {
        type: number
    } | undefined, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            let uri = `/api/admin/media-contents/all?type=${data?.type}`

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
                return rejectWithValue(res.errors)
            } else {
                const res = await response.json()
                return res
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
