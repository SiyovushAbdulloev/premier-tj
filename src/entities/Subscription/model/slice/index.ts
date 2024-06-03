import {Subscription, SubscriptionSchema} from "../../types/index";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getSubscriptions} from "../services/getSubscriptions";
import {getSubscription} from "../services/getSubscription";
import {storeSubscription} from "../services/storeSubscription";
import {updateSubscription} from "../services/updateSubscription";

const initialState: SubscriptionSchema = {
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

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Array<Subscription>>) => {
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
            .addCase(getSubscriptions.pending, (state, action) => {
                state.fetching = true
            })
            .addCase(getSubscriptions.fulfilled, (state, action) => {
                //@ts-ignore
                state.data = action.payload.data
                //@ts-ignore
                state.pagination = action.payload.pagination
                state.fetching = false
            })
            .addCase(getSubscriptions.rejected, (state, action) => {
                state.fetching = false
            })
            .addCase(storeSubscription.pending, (state, action) => {
                state.isStoring = true
            })
            .addCase(storeSubscription.fulfilled, (state, action) => {
                state.isStoring = false
            })
            .addCase(storeSubscription.rejected, (state, action) => {
                state.isStoring = false
                //@ts-ignore
                state.storeErrors = action.payload
            })
            .addCase(updateSubscription.pending, (state, action) => {
                state.isUpdating = true
            })
            .addCase(updateSubscription.fulfilled, (state, action) => {
                state.isUpdating = false
            })
            .addCase(updateSubscription.rejected, (state, action) => {
                state.isUpdating = false
                //@ts-ignore
                state.updateErrors = action.payload
            })
            .addCase(getSubscription.pending, (state, action) => {
                state.isFetchingOne = true
            })
            .addCase(getSubscription.fulfilled, (state, action) => {
                state.isFetchingOne = false
            })
            .addCase(getSubscription.rejected, (state, action) => {
                state.isFetchingOne = false
            })
    }
})

export const {actions: subscriptionActions} = subscriptionSlice
export const {reducer: subscriptionReducer} = subscriptionSlice
