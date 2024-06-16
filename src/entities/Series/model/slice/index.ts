import {Series, SeriesSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllSeries} from "../services/getAllSeries";
import {storeSeries} from "../services/storeSeries";
import {updateSeries} from "../services/updateSeries";
import {getSeries} from "../services/getSeries";
import {getAllSeriesWithoutPagination} from "../services/getAllSeriesWithoutPagination";

const initialState: SeriesSchema = {
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
}

export const seriesSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Series>>) => {
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
            .addCase(getAllSeries.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getAllSeries.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getAllSeries.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeSeries.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeSeries.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeSeries.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateSeries.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateSeries.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateSeries.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getSeries.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getSeries.rejected, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getAllSeriesWithoutPagination.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllSeriesWithoutPagination.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllSeriesWithoutPagination.rejected, (state, action) => {
                state.isFetchingAll = false
            })
    }
})

export const {actions: seriesActions} = seriesSlice
export const {reducer: seriesReducer} = seriesSlice
