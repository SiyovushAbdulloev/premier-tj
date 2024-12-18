import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const getGenres = createAsyncThunk(
    'genre/getGenres',
    async (data: { page: undefined|number, q: string|undefined } | undefined, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const page = data ? data.page ?? 1 : 1
            const q = data ? data.q ?? '' : ''
            let uri = `/api/admin/genres`

            uri += `?page=${page}`

            if (q.length) {
                uri += `&q=${q}`
            }

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
                // return rejectWithValue(data.errors)
            } else {
                const res = await response.json()

                return {
                    data: res.data,
                    pagination: {
                        current_page: res.meta.current_page,
                        last_page: res.meta.last_page,
                        per_page: res.meta.per_page,
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
