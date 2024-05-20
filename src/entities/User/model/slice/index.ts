import {User, UserSchema} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuthUser} from "src/entities/Auth";

const initialState: UserSchema = {
    authData: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User | undefined>) => {
            state.authData = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAuthUser.fulfilled, (state, action) => {
                state.authData = action.payload
            })
    }
})

export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice
