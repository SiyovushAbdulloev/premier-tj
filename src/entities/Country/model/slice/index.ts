import {Country, CountrySchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCountries} from '../services/getCountries'
import {storeCountry} from '../services/storeCountry'
import {updateCountry} from '../services/updateCountry'
import {getAllCountries} from '../services/getAllCountries'
import {getListCountries} from '../services/getListCountries'
import {InputError} from "src/entities/Auth";

const initialState: CountrySchema = {
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
    isFetchingList: false
}

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Country>>) => {
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
            .addCase(getCountries.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getCountries.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getCountries.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeCountry.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeCountry.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeCountry.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateCountry.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateCountry.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateCountry.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getAllCountries.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllCountries.rejected, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getListCountries.pending, (state, action) => {
                state.isFetchingList = true
            })
            .addCase(getListCountries.fulfilled, (state, action) => {
                state.isFetchingList = false
            })
            .addCase(getListCountries.rejected, (state, action) => {
                state.isFetchingList = false
            })
    }
})

export const {actions: countryActions} = countrySlice
export const {reducer: countryReducer} = countrySlice
