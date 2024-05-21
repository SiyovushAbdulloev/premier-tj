import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Actor} from "../../types";
import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export const getData = (state: StateSchema): Array<Actor> => state.actor.data
export const getPagination = (state: StateSchema): Pagination => state.actor.pagination
export const getFetching = (state: StateSchema): boolean => state.actor.fetching
export const getIsStoring = (state: StateSchema): boolean => state.actor.isStoring
export const getStoreErrors = (state: StateSchema): InputError | undefined => state.actor.storeErrors
export const getIsUpdating = (state: StateSchema): boolean => state.actor.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.actor.updateErrors
