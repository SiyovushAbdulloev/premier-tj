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
    getIsFetchingUserSeries,
} from "./model/selectors";
import {seriesActions, seriesReducer} from "./model/slice";
import {Series, SeriesSchema} from "./types";
import {getAllSeries} from "./model/services/getAllSeries";
import {getSeries} from "./model/services/getSeries";
import {storeSeries} from "./model/services/storeSeries";
import {updateSeries} from "./model/services/updateSeries";
import {destroySeries} from "./model/services/destroySeries";
import {getAllSeriesWithoutPagination} from "./model/services/getAllSeriesWithoutPagination";
import {getUserSeries} from "./model/services/getUserSeries";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getSeries,
    seriesReducer,
    seriesActions,
    getAllSeries,
    storeSeries,
    updateSeries,
    destroySeries,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
    getAllSeriesWithoutPagination,
    getIsFetchingAll,
    getUserSeries,
    getIsFetchingUserSeries,
}
export type {Series, SeriesSchema}
