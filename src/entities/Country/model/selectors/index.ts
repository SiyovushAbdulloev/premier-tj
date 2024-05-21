import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Country, Pagination} from "../../types";
import {InputError} from "src/entities/Auth";

export const getData = (state: StateSchema): Array<Country> => state.country.data
export const getPagination = (state: StateSchema): Pagination => state.country.pagination
export const getFetching = (state: StateSchema): boolean => state.country.fetching
export const getIsStoring = (state: StateSchema): boolean => state.country.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.country.storeErrors