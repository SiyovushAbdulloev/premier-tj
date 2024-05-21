import {Actor, ActorSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActors, storeActor, updateActor} from "src/entities/Actor";

const initialState: ActorSchema = {
    data: [],
    pagination: {
        current_page: 1,
        last_page: 1,
        per_page:10
    },
    fetching: false,
    isStoring: false,
    storeErrors: undefined,
    isUpdating: false,
    updateErrors: undefined
}

export const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Actor>>) => {
            state.data = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getActors.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getActors.fulfilled, (state, action) => {
                //@ts-ignore
                state.data = action.payload.data
                //@ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getActors.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeActor.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeActor.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeActor.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateActor.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateActor.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateActor.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
    }
})

export const {actions: actorActions} = actorSlice
export const {reducer: actorReducer} = actorSlice
