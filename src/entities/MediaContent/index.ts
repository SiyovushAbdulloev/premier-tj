import {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsFetchingOne,
    getIsUpdating,
    getIsFetchingAll,
    getIsFetchingMovie,
    getIsFetchingAllMovies,
    getIsSearching,
    getIsFavouring,
} from "./model/selectors";
import {mediaContentActions, mediaContentReducer} from "./model/slice";
import {MediaContent, MediaContentSchema} from "./types";
import {MediaContentType} from "./contants";
import {getMediaContents} from "./model/services/getMediaContents";
import {getMediaContent} from "./model/services/getMediaContent";
import {storeMediaContent} from "./model/services/storeMediaContent";
import {updateMediaContent} from "./model/services/updateMediaContent";
import {destroyMediaContent} from "./model/services/destroyMediaContent";
import {getAllMediaContents} from "./model/services/getAllMediaContents";
import {getMovie} from "./model/services/getMovie";
import {getAllMovies} from "./model/services/getAllMovies";
import {getAllMultimedias} from "./model/services/getAllMultimedias";
import {getMultimedia} from "./model/services/getMultimedia";
import {search} from "./model/services/search";
import {addToFavourite} from "./model/services/addToFavourite";
import {unFavourite} from "./model/services/unFavourite";
import {stream} from "./model/services/stream";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getMediaContent,
    mediaContentReducer,
    mediaContentActions,
    getMediaContents,
    storeMediaContent,
    updateMediaContent,
    destroyMediaContent,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
    getAllMediaContents,
    getIsFetchingAll,
    getMovie,
    getIsFetchingMovie,
    getAllMovies,
    getIsFetchingAllMovies,
    getAllMultimedias,
    getMultimedia,
    getIsSearching,
    search,
    getIsFavouring,
    addToFavourite,
    unFavourite,
    stream,
}
export type {MediaContent, MediaContentSchema, MediaContentType}
