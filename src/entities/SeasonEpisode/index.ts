import {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsFetchingOne,
    getIsUpdating,
} from "./model/selectors";
import {seasonEpisodeActions, seasonEpisodeReducer} from "./model/slice";
import {SeasonEpisode, SeasonEpisodeSchema} from "./types";
import {getSeasonEpisodes} from "./model/services/getSeasonEpisodes";
import {getSeasonEpisode} from "./model/services/getSeasonEpisode";
import {storeSeasonEpisode} from "./model/services/storeSeasonEpisode";
import {updateSeasonEpisode} from "./model/services/updateSeasonEpisode";
import {destroySeasonEpisode} from "./model/services/destroySeasonEpisode";
import {stream} from "./model/services/stream";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getSeasonEpisode,
    seasonEpisodeReducer,
    seasonEpisodeActions,
    getSeasonEpisodes,
    storeSeasonEpisode,
    updateSeasonEpisode,
    destroySeasonEpisode,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
    stream,
}
export type {SeasonEpisode, SeasonEpisodeSchema}
