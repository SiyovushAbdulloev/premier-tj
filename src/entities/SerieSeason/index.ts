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
import {serieSeasonActions, serieSeasonReducer} from "./model/slice";
import {SerieSeason, SerieSeasonSchema} from "./types";
import {getSerieSeasons} from "./model/services/getSerieSeasons";
import {getSerieSeason} from "./model/services/getSerieSeason";
import {storeSerieSeason} from "./model/services/storeSerieSeason";
import {updateSerieSeason} from "./model/services/updateSerieSeason";
import {destroySerieSeason} from "./model/services/destroySerieSeason";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getSerieSeason,
    serieSeasonReducer,
    serieSeasonActions,
    getSerieSeasons,
    storeSerieSeason,
    updateSerieSeason,
    destroySerieSeason,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
}
export type {SerieSeason, SerieSeasonSchema}
