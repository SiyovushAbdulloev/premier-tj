import {Role} from "src/entities/Role";

export interface Favourite {
    id: number
    item: {
        id: number
        type: string
    }
}

export interface User {
    id: number
    firstname: string
    lastname?: string
    phone: string
    roles: Array<Role>
    favourites: Array<Favourite>|null
}

export interface UserSchema {
    authData?: User
    isFetchingFavourites: boolean
}
