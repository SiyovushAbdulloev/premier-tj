import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCsrfToken} from "src/entities/Auth";

export const updateActor = createAsyncThunk(
    'actor/updateActor',
    async (data: { id: number, first_name: string, last_name: string, avatar?: any }, {rejectWithValue, getState, dispatch}) => {
        try {
            await dispatch(getCsrfToken())

            // @ts-ignore
            const csrfToken = getState().auth.data.csrfToken
            const formData = new FormData()
            formData.append('first_name', data.first_name)
            formData.append('last_name', data.last_name)
            formData.append('_method', 'PUT')
            if (data.avatar) {
                formData.append('avatar', data.avatar)
            }

            const response = await fetch(APP_URL + `/api/admin/actors/${data.id}`, {
                method: 'POST',
                headers: {
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
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
