import {PageSection, PageSectionSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPageSections} from "../services/getPageSections";
import {storePageSection} from "../services/storePageSection";
import {updatePageSection} from "../services/updatePageSection";
import {getPageSection} from "../services/getPageSection";
import {getAllPageSections} from "../services/getAllPageSections";
import {getPages} from "../services/getPages";

const initialState: PageSectionSchema = {
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
    isFetchingPages: false,
}

export const pageSectionSlice = createSlice({
    name: 'pageSection',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<PageSection>>) => {
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
            .addCase(getPageSections.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getPageSections.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getPageSections.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storePageSection.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storePageSection.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storePageSection.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updatePageSection.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updatePageSection.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updatePageSection.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getPageSection.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getPageSection.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getPageSection.rejected, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getAllPageSections.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllPageSections.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllPageSections.rejected, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getPages.pending, (state, action) => {
                state.isFetchingPages = true
            })
            .addCase(getPages.fulfilled, (state, action) => {
                state.isFetchingPages = false
            })
            .addCase(getPages.rejected, (state, action) => {
                state.isFetchingPages = false
            })
    }
})

export const {actions: pageSectionActions} = pageSectionSlice
export const {reducer: pageSectionReducer} = pageSectionSlice
