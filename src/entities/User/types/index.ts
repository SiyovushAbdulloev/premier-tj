import {Role} from "src/entities/Role";

export interface User {
    id: number
    firstname: string
    lastname: string
    phone: string
    roles: Array<Role>
}

export interface UserSchema {
    authData?: User
}
