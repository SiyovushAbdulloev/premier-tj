import {SocialLink, SocialLinkSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getLinks} from '../services/getLinks'
import {updateLink} from '../services/updateLink'
import {getAllLinks} from '../services/getAllLinks'
import {InputError} from "src/entities/Auth";
import {getLink} from "src/entities/SocialLink";

const initialState: SocialLinkSchema = {
    data: [],
    pagination: {
        current_page: 1,
        last_page: 1,
        per_page:10
    },
    fetching: false,
    isUpdating: false,
    updateErrors: undefined,
    isFetchingAll: false,
    isFetchingOne: false,
}

export const socialLinkSlice = createSlice({
    name: 'socialLink',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<SocialLink>>) => {
            state.data = action.payload
        },
        setUpdateErrors: (state, action: PayloadAction<InputError | undefined>) => {
            state.updateErrors = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getLinks.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getLinks.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getLinks.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(getLink.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getLink.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getLink.rejected, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(updateLink.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateLink.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateLink.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getAllLinks.pending, (state, action) => {
                state.isFetchingAll = true
            })
            .addCase(getAllLinks.fulfilled, (state, action) => {
                state.isFetchingAll = false
            })
            .addCase(getAllLinks.rejected, (state, action) => {
                state.isFetchingAll = false
            })
    }
})

export const {actions: socialLinkActions} = socialLinkSlice
export const {reducer: socialLinkReducer} = socialLinkSlice
