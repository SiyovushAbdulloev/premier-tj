import {StateSchema} from "src/app/providers/Store/config/StateSchema";

export const getIsFetchingFavourites = (state: StateSchema): boolean => state.user.isFetchingFavourites
