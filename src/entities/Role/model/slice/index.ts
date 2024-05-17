import {Role, RoleSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: RoleSchema = {
    data: []
}

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<Array<Role>>) => {
            state.data = action.payload
        },
    }
})

export const {actions: roleActions} = roleSlice
export const {reducer: roleReducer} = roleSlice