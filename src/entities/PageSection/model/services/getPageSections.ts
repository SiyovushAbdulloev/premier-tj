import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";

export const getPageSections = createAsyncThunk(
    'pageSections/getPageSections',
    async (data: {
        page: number,
        page_slug?: string
    }, {getState, rejectWithValue}) => {
        try {
            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            let uri = `/api/admin/page-sections?page=${data.page}`

            if (data.page_slug) {
                uri += `&p=${data.page_slug}`
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
