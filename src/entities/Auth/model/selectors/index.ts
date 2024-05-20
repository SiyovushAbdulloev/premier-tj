import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {InputError} from "../../types";

export const getUnauthorized = (state: StateSchema): boolean => state.auth.data.unauthorized
export const getNotFound = (state: StateSchema): boolean => state.auth.data.notFound
export const getLoginErrors = (state: StateSchema): InputError | undefined => state.auth.data.loginErrors
export const getIsLogging = (state: StateSchema): boolean => state.auth.data.isLogging
