import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const getSeasonEpisode = createAsyncThunk(
    'seasonEpisode/getSeasonEpisode',
    async (data: {id: number, serie: string, serie_season: number}, {getState, rejectWithValue}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken

            if (data.id != 0 && data.serie.length != 0 && data.serie_season != 0) {
                const response = await fetch(APP_URL + `/api/admin/series/${data.serie}/serie-seasons/${data.serie_season}/season-episodes/${data.id}`, {
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
                    return res.data
                }
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
