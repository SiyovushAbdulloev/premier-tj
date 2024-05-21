import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Genre} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<Genre> => state.genre.data
export const getPagination = (state: StateSchema): Pagination => state.genre.pagination
export const getFetching = (state: StateSchema): boolean => state.genre.fetching
export const getIsStoring = (state: StateSchema): boolean => state.genre.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.genre.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.genre.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.genre.updateErrors
