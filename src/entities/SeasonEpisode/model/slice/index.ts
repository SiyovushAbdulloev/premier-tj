import {SeasonEpisode, SeasonEpisodeSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSeasonEpisodes} from "../services/getSeasonEpisodes";
import {storeSeasonEpisode} from "../services/storeSeasonEpisode";
import {updateSeasonEpisode} from "../services/updateSeasonEpisode";
import {getSeasonEpisode} from "../services/getSeasonEpisode";

const initialState: SeasonEpisodeSchema = {
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
    isFetchingOne: false,
}

export const seasonEpisodeSlice = createSlice({
    name: 'seasonEpisode',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<SeasonEpisode>>) => {
            state.data = action.payload
        },
        setStoreErrors: (state, action) => {
            state.storeErrors = action.payload
        },
        setUpdateErrors: (state, action) => {
            state.updateErrors = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSeasonEpisodes.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getSeasonEpisodes.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getSeasonEpisodes.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeSeasonEpisode.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeSeasonEpisode.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeSeasonEpisode.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateSeasonEpisode.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateSeasonEpisode.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateSeasonEpisode.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getSeasonEpisode.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getSeasonEpisode.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getSeasonEpisode.rejected, (state, action) => {
                state.isFetchingOne = false
            })
    }
})

export const {actions: seasonEpisodeActions} = seasonEpisodeSlice
export const {reducer: seasonEpisodeReducer} = seasonEpisodeSlice
