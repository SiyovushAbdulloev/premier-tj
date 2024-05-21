import {getData, getPagination, getFetching, getIsStoring, getStoreErrors, getUpdateErrors, getIsUpdating} from "./model/selectors";
import {genreActions, genreReducer} from "./model/slice";
import {Genre, GenreSchema} from "./types";
import {getGenres} from "./model/services/getGenres";
import {destroyGenre} from "./model/services/destroyGenre";
import {storeGenre} from "./model/services/storeGenre";
import {updateGenre} from "./model/services/updateGenre";
import {getGenre} from "./model/services/getGenre";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsUpdating,
    genreReducer,
    genreActions,
    getGenres,
    destroyGenre,
    storeGenre,
    updateGenre,
    getGenre,
}
export type {Genre, GenreSchema}
