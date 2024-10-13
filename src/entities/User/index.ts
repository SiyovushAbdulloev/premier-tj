import {userActions, userReducer} from "src/entities/User/model/slice";
import {getAuthUserData} from "./model/selectors/getAuthUserData";
import {getIsFetchingFavourites} from "./model/selectors/getIsFetchingFavourites";
import {can} from "src/entities/User/utils/can";
import {Favourite} from "./types"
import {getFavourites} from "./model/services/getFavourites";

export {userActions, userReducer, getAuthUserData, can, getIsFetchingFavourites, getFavourites}
export type {Favourite}
