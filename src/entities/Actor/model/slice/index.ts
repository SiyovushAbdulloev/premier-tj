import {Actor, ActorSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActors} from '../services/getActors'
import {storeActor} from '../services/storeActor'
import {updateActor} from '../services/updateActor'
import {getAllActors} from '../services/getAllActors'
import {InputError} from "src/entities/Auth";

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
    updateErrors: undefined,
    isFetchingAll: false,
}

export const actorSlice = createSlice({
    name: 'actor',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Actor>>) => {
            state.data = action.payload
        },
        setStoreErors: (state, action: PayloadAction<InputError | undefined>) => {
            state.storeErrors = action.payload
        },
        setUpdateErors: (state, action: PayloadAction<InputError | undefined>) => {
            state.updateErrors = action.payload
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
            .addCase(getAllActors.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllActors.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllActors.rejected, (state, action) => {
                state.isFetchingAll = false
            })
    }
})

export const {actions: actorActions} = actorSlice
export const {reducer: actorReducer} = actorSlice
