import {User, UserSchema} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuthUser} from "src/entities/Auth";
import {getFavourites} from "../services/getFavourites";

const initialState: UserSchema = {
    authData: undefined,
    isFetchingFavourites: false
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
            .addCase(getFavourites.fulfilled, (state, action) => {
                state.isFetchingFavourites = false
            })
            .addCase(getFavourites.pending, (state, action) => {
                state.isFetchingFavourites = true
            })
            .addCase(getFavourites.rejected, (state, action) => {
                state.isFetchingFavourites = false
            })
    }
})

export const {actions: userActions} = userSlice
export const {reducer: userReducer} = userSlice
