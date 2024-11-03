import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {SocialLink, Pagination} from "../../types";
import {InputError} from "src/entities/Auth";

export const getData = (state: StateSchema): Array<SocialLink> => state.socialLink.data
export const getPagination = (state: StateSchema): Pagination => state.socialLink.pagination
export const getFetching = (state: StateSchema): boolean => state.socialLink.fetching
export const getIsUpdating = (state: StateSchema): boolean => state.socialLink.isUpdating
export const getUpdateErrors = (state: StateSchema): InputError | undefined => state.socialLink.updateErrors
export const getIsFetchingAll = (state: StateSchema): boolean => state.socialLink.isFetchingAll
export const getIsFetchingOne = (state: StateSchema): boolean => state.socialLink.isFetchingOne
