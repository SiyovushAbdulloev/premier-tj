import {createAsyncThunk} from "@reduxjs/toolkit";
import {APP_URL} from "src/shared/constants/api";
import {getCookie} from "src/shared/utils/getCookie";

export const getCsrfToken = createAsyncThunk(
    'auth/csrfToken',
    async () => {
        try {
            const data = await fetch(APP_URL + '/sanctum/csrf-cookie', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // 'Referer': 'http://localhost:3000'
                },
                credentials: 'include'
            })

            const token = getCookie('XSRF-TOKEN')
            return token.substring(0, token.length - 3)

        } catch (error) {
            console.log('Error in getting csrf-token:', error)
        }
    }
)
