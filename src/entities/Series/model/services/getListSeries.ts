import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const getListSeries = createAsyncThunk(
    'series/getListSeries',
    async (data: {
        genres?: Array<string>,
        countries?: Array<string>,
        years?: Array<string>,
        page?: number
    } | undefined, {getState, rejectWithValue}) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            let uri = `/api/series?page=${data?.page}`

            if (data?.genres && data.genres.length) {
                if (data.genres.includes('all')) {
                    uri += `&genres=all`
                } else {
                    uri += `&genres=${data.genres.join(',')}`
                }
            }
            if (data?.countries && data.countries.length) {
                if (data.countries.includes('all')) {
                    uri += `&countries=all`
                } else {
                    uri += `&countries=${data.countries.join(',')}`
                }
            }
            if (data?.years && data.years.length) {
                if (data.years.includes('all')) {
                    uri += `&years=all`
                } else {
                    uri += `&years=${data.years.join(',')}`
                }
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
                console.log({data})
                // return rejectWithValue(data.errors)
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
