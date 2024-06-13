import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface SerieSeason {
    id: number
    number: number
    description: string
    is_published: number
    trailer: string
    serie_id: number
}

export interface SerieSeasonSchema {
    data: Array<SerieSeason>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
}
