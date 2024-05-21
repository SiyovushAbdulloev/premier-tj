import {getData, getPagination, getFetching, getIsStoring, getStoreErrors} from "./model/selectors";
import {countryActions, countryReducer} from "./model/slice";
import {Country, CountrySchema, Pagination} from "./types";
import {getCountries} from "./model/services/getCountries";
import {storeCountry} from "./model/services/storeCountry";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    countryReducer,
    countryActions,
    getCountries,
    storeCountry,
}
export type {Country, CountrySchema, Pagination}
