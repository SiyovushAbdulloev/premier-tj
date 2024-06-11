import {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getIsFetchingAll,
} from "./model/selectors";
import {countryActions, countryReducer} from "./model/slice";
import {Country, CountrySchema, Pagination} from "./types";
import {getCountries} from "./model/services/getCountries";
import {getCountry} from "./model/services/getCountry";
import {storeCountry} from "./model/services/storeCountry";
import {updateCountry} from "./model/services/updateCountry";
import {destroyCountry} from "./model/services/destroyCountry";
import {getAllCountries} from "./model/services/getAllCountries";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getCountry,
    countryReducer,
    countryActions,
    getCountries,
    storeCountry,
    updateCountry,
    destroyCountry,
    getIsFetchingAll,
    getAllCountries,
}
export type {Country, CountrySchema, Pagination}
