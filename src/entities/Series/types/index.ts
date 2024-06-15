import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface Series {
    id: number
    name: string
    genre_ids: Array<number>
    country_ids: Array<number>
    subscription_ids: Array<number>
    actor_ids: Array<number>
    description: string
    is_published: number
    likes: number
    trailer: string
    released_at: string
}

export interface SeriesSchema {
    data: Array<Series>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
}