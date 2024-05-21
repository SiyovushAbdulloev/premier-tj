import {UserSchema} from "src/entities/User/types";
import {AuthSchema} from "src/entities/Auth/types";
import {RoleSchema} from "src/entities/Role";
import {CountrySchema} from "src/entities/Country";
import {GenreSchema} from "src/entities/Genre";

export interface StateSchema {
    user: UserSchema
    role: RoleSchema
    auth: AuthSchema
    country: CountrySchema
    genre: GenreSchema
}
