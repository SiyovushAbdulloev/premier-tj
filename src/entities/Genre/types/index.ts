import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface Genre {
    id: number
    name: string
}

export interface GenreSchema {
    data: Array<Genre>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingAll: boolean
    isFetchingList: boolean
}
