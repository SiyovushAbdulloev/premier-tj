import {SubscriptionRequest, SubscriptionRequestSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSubscriptionRequests} from "../services/getSubscriptionRequests";
import {getSubscriptionRequest} from "../services/getSubscriptionRequest";
import {rejectSubscriptionRequest} from "../services/rejectSubscriptionRequest";
import {approveSubscriptionRequest} from "../services/approveSubscriptionRequest";

const initialState: SubscriptionRequestSchema = {
    data: [],
    pagination: {
        current_page: 1,
        last_page: 1,
        per_page:10
    },
    fetching: false,
    isFetchingOne: false,
    isApproving: false,
    isRejecting: false,
}

export const subscriptionRequestSlice = createSlice({
    name: 'subscriptionRequest',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<SubscriptionRequest>>) => {
            state.data = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getSubscriptionRequests.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getSubscriptionRequests.fulfilled, (state, action) => {
                // @ts-ignore
                state.data = action.payload.data
                // @ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getSubscriptionRequests.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(getSubscriptionRequest.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getSubscriptionRequest.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getSubscriptionRequest.rejected, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(rejectSubscriptionRequest.pending, (state, action) => {
                state.isRejecting = true
            })
            .addCase(rejectSubscriptionRequest.fulfilled, (state, action) => {
                state.isRejecting = false
            })
            .addCase(rejectSubscriptionRequest.rejected, (state, action) => {
                state.isRejecting = false
            })
            .addCase(approveSubscriptionRequest.pending, (state, action) => {
                state.isApproving = true
            })
            .addCase(approveSubscriptionRequest.fulfilled, (state, action) => {
                state.isApproving = false
            })
            .addCase(approveSubscriptionRequest.rejected, (state, action) => {
                state.isApproving = false
            })
    }
})

export const {actions: subscriptionRequestActions} = subscriptionRequestSlice
export const {reducer: subscriptionRequestReducer} = subscriptionRequestSlice
