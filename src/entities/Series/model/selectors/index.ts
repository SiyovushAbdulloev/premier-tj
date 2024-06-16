import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Series} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<Series> => state.series.data
export const getPagination = (state: StateSchema): Pagination => state.series.pagination
export const getFetching = (state: StateSchema): boolean => state.series.fetching
export const getIsStoring = (state: StateSchema): boolean => state.series.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.series.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.series.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.series.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.series.isFetchingOne
export const getIsFetchingAll = (state: StateSchema): boolean => state.series.isFetchingAll
