import {Country, CountrySchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getCountries} from "src/entities/Country";

const initialState: CountrySchema = {
    data: [],
    pagination: {
        current_page: 1,
        last_page: 1,
        per_page:10
    },
    fetching: false
}

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Country>>) => {
            state.data = action.payload
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
    }
})

export const {actions: countryActions} = countrySlice
export const {reducer: countryReducer} = countrySlice
