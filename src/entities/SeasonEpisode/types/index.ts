import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface SeasonEpisode {
    id: number
    number: number
    description: string
    duration: string
    is_published: number
    file: string
    season_id: number
    subscription_ids: Array<number>
}

export interface SeasonEpisodeSchema {
    data: Array<SeasonEpisode>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
}
