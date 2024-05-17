import {userActions, userReducer} from "src/entities/User/model/slice";
import {getAuthUserData} from "src/entities/User/model/selectors/getAuthUserData";
import {can} from "src/entities/User/utils/can";

export {userActions, userReducer, getAuthUserData, can}