import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {User} from "src/entities/User/types";

export const getAuthUserData = (state: StateSchema): User|undefined => state.user.authData