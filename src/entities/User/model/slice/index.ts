import {User, UserSchema} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: UserSchema = {
    authData: {
        id: 1,
        username: "Siyovush",
        roles: [
            {
                id: 1,
                name: 'admin',
                description: 'Admin role',
                permissions: []
            }
        ]
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
        }
    }
})

export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice