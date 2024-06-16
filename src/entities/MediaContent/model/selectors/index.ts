import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {MediaContent} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<MediaContent> => state.mediaContent.data
export const getPagination = (state: StateSchema): Pagination => state.mediaContent.pagination
export const getFetching = (state: StateSchema): boolean => state.mediaContent.fetching
export const getIsStoring = (state: StateSchema): boolean => state.mediaContent.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.mediaContent.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.mediaContent.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.mediaContent.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.mediaContent.isFetchingOne
export const getIsFetchingAll = (state: StateSchema): boolean => state.mediaContent.isFetchingAll
