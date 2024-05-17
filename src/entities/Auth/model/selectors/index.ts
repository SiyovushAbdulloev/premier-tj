import {StateSchema} from "src/app/providers/Store/config/StateSchema";

export const getUnauthorized = (state: StateSchema): boolean => state.auth.unauthorized
export const getNotFound= (state: StateSchema): boolean => state.auth.notFound