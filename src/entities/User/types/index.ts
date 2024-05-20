import {Role} from "src/entities/Role";

export interface User {
    id: number
    full_name: string
    phone: string
    email: string
    roles: Array<Role>
}

export interface UserSchema {
    authData?: User
}
