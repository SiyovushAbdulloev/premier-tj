import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {PageSection} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<PageSection> => state.pageSection.data
export const getPagination = (state: StateSchema): Pagination => state.pageSection.pagination
export const getFetching = (state: StateSchema): boolean => state.pageSection.fetching
export const getIsStoring = (state: StateSchema): boolean => state.pageSection.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.pageSection.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.pageSection.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.pageSection.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.pageSection.isFetchingOne
export const getIsFetchingAll = (state: StateSchema): boolean => state.pageSection.isFetchingAll
export const getIsFetchingPages = (state: StateSchema): boolean => state.pageSection.isFetchingPages
