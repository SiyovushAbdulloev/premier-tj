import {getData, getPagination, getFetching} from "./model/selectors";
import {countryActions, countryReducer} from "./model/slice";
import {Country, CountrySchema, Pagination} from "./types";
import {getCountries} from "./model/services/getCountries";

export {
    getData,
    getPagination,
    getFetching,
    countryReducer,
    countryActions,
    getCountries,
}
export type {Country, CountrySchema, Pagination}
