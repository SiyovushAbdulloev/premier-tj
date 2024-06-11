import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Subscription} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<Subscription> => state.subscription.data
export const getPagination = (state: StateSchema): Pagination => state.subscription.pagination
export const getFetching = (state: StateSchema): boolean => state.subscription.fetching
export const getIsStoring = (state: StateSchema): boolean => state.subscription.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.subscription.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.subscription.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.subscription.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.subscription.isFetchingOne
export const getIsFetchingAll = (state: StateSchema): boolean => state.subscription.isFetchingAll
