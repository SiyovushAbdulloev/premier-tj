import {InputError} from "src/entities/Auth";

export interface SocialLink {
    id: number
    name: string
    label: string
    path?: string
}

export interface Pagination {
    current_page: number
    last_page: number
    per_page: number
}

export interface SocialLinkSchema {
    data: Array<SocialLink>
    pagination: Pagination
    fetching: boolean
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingAll: boolean
    isFetchingOne: boolean
}
