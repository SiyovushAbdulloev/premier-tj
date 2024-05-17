import {UserSchema} from "src/entities/User/types";
import {Auth} from "src/entities/Auth/types";
import {RoleSchema} from "src/entities/Role";

export interface StateSchema {
    user: UserSchema
    auth: Auth
    role: RoleSchema
}