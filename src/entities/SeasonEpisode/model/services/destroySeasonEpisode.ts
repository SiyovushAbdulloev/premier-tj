import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const destroySeasonEpisode = createAsyncThunk(
    'seasonEpisode/destroySeasonEpisode',
    async (data: {id: number, serie: string, serie_season: number}, {rejectWithValue, getState}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            const response = await fetch(APP_URL + `/api/admin/series/${data.serie}/serie-seasons/${data.serie_season}/season-episodes/${data.id}`, {
                method: 'DELETE',
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
                console.log({res})
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
