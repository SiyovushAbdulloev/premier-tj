import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Country, Pagination} from "../../types";

export const getData = (state: StateSchema): Array<Country> => state.country.data
export const getPagination = (state: StateSchema): Pagination => state.country.pagination
export const getFetching = (state: StateSchema): boolean => state.country.fetching
