import {Role} from "src/entities/Role";

export interface User {
    id: number
    username: string
    roles: Array<Role>
}

export interface UserSchema {
    authData?: User
}