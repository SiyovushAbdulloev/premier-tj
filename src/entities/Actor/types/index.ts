import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface Actor {
    id: number
    first_name: string
    last_name: string
    avatar: string
}

export interface ActorSchema {
    data: Array<Actor>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingAll: boolean
}
