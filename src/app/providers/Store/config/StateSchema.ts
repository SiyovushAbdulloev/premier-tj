import {UserSchema} from "src/entities/User/types";
import {AuthSchema} from "src/entities/Auth/types";
import {RoleSchema} from "src/entities/Role";

export interface StateSchema {
    user: UserSchema
    role: RoleSchema
    auth: AuthSchema
}
