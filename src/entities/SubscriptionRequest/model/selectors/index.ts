import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {SubscriptionRequest} from "../../types";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<SubscriptionRequest> => state.subscriptionRequest.data
export const getPagination = (state: StateSchema): Pagination => state.subscriptionRequest.pagination
export const getFetching = (state: StateSchema): boolean => state.subscriptionRequest.fetching
export const getIsFetchingOne = (state: StateSchema): boolean => state.subscriptionRequest.isFetchingOne
export const getIsApproving = (state: StateSchema): boolean => state.subscriptionRequest.isApproving
export const getIsRejecting = (state: StateSchema): boolean => state.subscriptionRequest.isRejecting
