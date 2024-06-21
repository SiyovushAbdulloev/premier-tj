import {MediaContent, MediaContentSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMediaContents} from "../services/getMediaContents";
import {storeMediaContent} from "../services/storeMediaContent";
import {updateMediaContent} from "../services/updateMediaContent";
import {getMediaContent} from "../services/getMediaContent";
import {getAllMediaContents} from "../services/getAllMediaContents";
import {getAllMovies} from "../services/getAllMovies";
import {getMovie} from "../services/getMovie";

const initialState: MediaContentSchema = {
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
    isFetchingAll: false,
    isFetchingMovie: false,
    isFetchingAllMovies: false,
}

export const mediaContentSlice = createSlice({
    name: 'mediaContent',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<MediaContent>>) => {
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
            .addCase(getMediaContents.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getMediaContents.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getMediaContents.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeMediaContent.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeMediaContent.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeMediaContent.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateMediaContent.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateMediaContent.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateMediaContent.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getMediaContent.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getMediaContent.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getMediaContent.rejected, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getAllMediaContents.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllMediaContents.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllMediaContents.rejected, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getMovie.pending, (state, action) => {
                state.isFetchingMovie = true
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.isFetchingMovie = false
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.isFetchingMovie = false
            })
            .addCase(getAllMovies.pending, (state, action) => {
                state.isFetchingAllMovies = true
            })
            .addCase(getAllMovies.fulfilled, (state, action) => {
                state.isFetchingAllMovies = false
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.isFetchingAllMovies = false
            })
    }
})

export const {actions: mediaContentActions} = mediaContentSlice
export const {reducer: mediaContentReducer} = mediaContentSlice
