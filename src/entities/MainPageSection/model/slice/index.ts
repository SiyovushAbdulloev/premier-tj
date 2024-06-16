import {MainPageSection, MainPageSectionSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMainPageSections} from "../services/getMainPageSections";
import {storeMainPageSection} from "../services/storeMainPageSection";
import {updateMainPageSection} from "../services/updateMainPageSection";
import {getMainPageSection} from "../services/getMainPageSection";

const initialState: MainPageSectionSchema = {
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

export const mainPageSectionSlice = createSlice({
    name: 'mainPageSection',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<MainPageSection>>) => {
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
            .addCase(getMainPageSections.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getMainPageSections.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getMainPageSections.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeMainPageSection.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeMainPageSection.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeMainPageSection.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateMainPageSection.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateMainPageSection.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateMainPageSection.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getMainPageSection.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getMainPageSection.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getMainPageSection.rejected, (state, action) => {
                state.isFetchingOne = false
            })
    }
})

export const {actions: mainPageSectionActions} = mainPageSectionSlice
export const {reducer: mainPageSectionReducer} = mainPageSectionSlice
