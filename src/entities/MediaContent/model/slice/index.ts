import {MediaContent, MediaContentSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMediaContents} from "../services/getMediaContents";
import {storeMediaContent} from "../services/storeMediaContent";
import {updateMediaContent} from "../services/updateMediaContent";
import {getMediaContent} from "../services/getMediaContent";
import {getAllMediaContents} from "../services/getAllMediaContents";
import {getAllMovies} from "../services/getAllMovies";
import {getAllMultimedias} from "../services/getAllMultimedias";
import {getMovie} from "../services/getMovie";
import {getMultimedia} from "../services/getMultimedia";
import {search} from "../services/search";
import {addToFavourite} from "../services/addToFavourite";
import {unFavourite} from "../services/unFavourite";

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
    isSearching: false,
    isFavouring: false
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
            .addCase(getMultimedia.pending, (state, action) => {
                state.isFetchingMovie = true
            })
            .addCase(getMultimedia.fulfilled, (state, action) => {
                state.isFetchingMovie = false
            })
            .addCase(getMultimedia.rejected, (state, action) => {
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
            .addCase(getAllMultimedias.pending, (state, action) => {
                state.isFetchingAllMovies = true
            })
            .addCase(getAllMultimedias.fulfilled, (state, action) => {
                state.isFetchingAllMovies = false
            })
            .addCase(getAllMultimedias.rejected, (state, action) => {
                state.isFetchingAllMovies = false
            })
            .addCase(search.pending, (state, action) => {
                state.isSearching = true
            })
            .addCase(search.fulfilled, (state, action) => {
                state.isSearching = false
            })
            .addCase(search.rejected, (state, action) => {
                state.isSearching = false
            })
            .addCase(addToFavourite.pending, (state, action) => {
                state.isFavouring = true
            })
            .addCase(addToFavourite.fulfilled, (state, action) => {
                state.isFavouring = false
            })
            .addCase(addToFavourite.rejected, (state, action) => {
                state.isFavouring = false
            })
            .addCase(unFavourite.pending, (state, action) => {
                state.isFavouring = true
            })
            .addCase(unFavourite.fulfilled, (state, action) => {
                state.isFavouring = false
            })
            .addCase(unFavourite.rejected, (state, action) => {
                state.isFavouring = false
            })
    }
})

export const {actions: mediaContentActions} = mediaContentSlice
export const {reducer: mediaContentReducer} = mediaContentSlice
