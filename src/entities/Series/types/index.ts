import {InputError} from "src/entities/Auth";
import {Country, Pagination} from "src/entities/Country";
import {Genre} from "src/entities/Genre";
import {Actor} from "src/entities/Actor";
import {SerieSeason} from "src/entities/SerieSeason";

export interface Series {
    id: number
    name: string
    genre_ids: Array<number>
    country_ids: Array<number>
    actor_ids: Array<number>
    description: string
    is_published: number
    likes: number
    trailer: string
    poster: string
    released_at: string
    genres: Array<Genre>
    actors: Array<Actor>
    countries: Array<Country>
    seasons: Array<SerieSeason>
    kinopoisk?: string
    imdb?: string
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
    isFetchingAll: boolean
    isFetchingUserSeries: boolean
    isFetchingListSeries: boolean
}
