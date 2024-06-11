import {Genre, GenreSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getGenres} from '../services/getGenres'
import {storeGenre} from '../services/storeGenre'
import {updateGenre} from '../services/updateGenre'
import {getAllGenres} from '../services/getAllGenres'

const initialState: GenreSchema = {
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

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Genre>>) => {
            state.data = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getGenres.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                //@ts-ignore
                state.data = action.payload.data
                //@ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeGenre.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeGenre.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeGenre.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateGenre.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateGenre.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateGenre.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getAllGenres.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllGenres.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllGenres.rejected, (state, action) => {
                state.isFetchingAll = false
            })
    }
})

export const {actions: genreActions} = genreSlice
export const {reducer: genreReducer} = genreSlice
