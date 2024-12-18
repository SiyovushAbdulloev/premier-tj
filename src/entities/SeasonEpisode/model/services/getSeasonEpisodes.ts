import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const getSeasonEpisodes = createAsyncThunk(
    'seasonEpisode/getSeasonEpisodes',
    async (data: {
        page: undefined|number,
        serie: string,
        serie_season: number,
    }, {getState, rejectWithValue, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const page = data ? data.page ?? 1 : 1

            if (data.serie.length != 0) {
                let uri = `/api/admin/series/${data.serie}/serie-seasons/${data.serie_season}/season-episodes`

                uri += `?page=${page}`

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
            }
        } catch (error) {
            console.log({error})

            // @ts-ignore
            return rejectWithValue(error.response.data)
        }
    }
)
