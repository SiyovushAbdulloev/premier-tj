import {InputError} from "src/entities/Auth";

export interface Country {
    id: number
    name: string
}

export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
}

export interface CountrySchema {
    data: Array<Country>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isFetchingAll: boolean
}
