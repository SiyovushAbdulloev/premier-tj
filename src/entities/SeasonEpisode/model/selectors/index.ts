import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {SeasonEpisode} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<SeasonEpisode> => state.seasonEpisode.data
export const getPagination = (state: StateSchema): Pagination => state.seasonEpisode.pagination
export const getFetching = (state: StateSchema): boolean => state.seasonEpisode.fetching
export const getIsStoring = (state: StateSchema): boolean => state.seasonEpisode.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.seasonEpisode.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.seasonEpisode.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.seasonEpisode.updateErrors
export const getIsFetchingOne = (state: StateSchema): boolean => state.seasonEpisode.isFetchingOne
