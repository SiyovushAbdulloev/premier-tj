import {Role} from "src/entities/Role";

export interface User {
    id: number
    first_name: string
    last_name: string
    phone: string
    roles: Array<Role>
}

export interface UserSchema {
    authData?: User
}
