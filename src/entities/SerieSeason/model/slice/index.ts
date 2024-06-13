import {SerieSeason, SerieSeasonSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSerieSeasons} from "../services/getSerieSeasons";
import {storeSerieSeason} from "../services/storeSerieSeason";
import {updateSerieSeason} from "../services/updateSerieSeason";
import {getSerieSeason} from "../services/getSerieSeason";

const initialState: SerieSeasonSchema = {
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

export const serieSeasonSlice = createSlice({
    name: 'serieSeason',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<SerieSeason>>) => {
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
            .addCase(getSerieSeasons.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getSerieSeasons.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getSerieSeasons.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeSerieSeason.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeSerieSeason.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeSerieSeason.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateSerieSeason.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateSerieSeason.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateSerieSeason.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getSerieSeason.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getSerieSeason.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getSerieSeason.rejected, (state, action) => {
                state.isFetchingOne = false
            })
    }
})

export const {actions: serieSeasonActions} = serieSeasonSlice
export const {reducer: serieSeasonReducer} = serieSeasonSlice
