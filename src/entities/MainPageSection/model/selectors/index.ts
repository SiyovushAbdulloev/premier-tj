import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {MainPageSection} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<MainPageSection> => state.mainPageSection.data
export const getPagination = (state: StateSchema): Pagination => state.mainPageSection.pagination
export const getFetching = (state: StateSchema): boolean => state.mainPageSection.fetching
export const getIsStoring = (state: StateSchema): boolean => state.mainPageSection.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.mainPageSection.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.mainPageSection.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.mainPageSection.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.mainPageSection.isFetchingOne
