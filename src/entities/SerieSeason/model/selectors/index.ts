import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {SerieSeason} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<SerieSeason> => state.serieSeason.data
export const getPagination = (state: StateSchema): Pagination => state.serieSeason.pagination
export const getFetching = (state: StateSchema): boolean => state.serieSeason.fetching
export const getIsStoring = (state: StateSchema): boolean => state.serieSeason.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.serieSeason.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.serieSeason.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.serieSeason.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.serieSeason.isFetchingOne
