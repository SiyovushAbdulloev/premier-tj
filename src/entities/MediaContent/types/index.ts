import {InputError} from "src/entities/Auth";
import {Country, Pagination} from "src/entities/Country";
import {MediaContentType} from "../contants";
import {Genre} from "src/entities/Genre";
import {Actor} from "src/entities/Actor";

export interface MediaContent {
    id: number
    name: string
    genre_ids: Array<number>
    country_ids: Array<number>
    subscription_ids: Array<number>
    actor_ids: Array<number>
    duration: string
    description: string
    is_published: number
    likes: number
    file: string
    trailer: string
    released_at: string
    poster: string
    small_poster: string
    type: MediaContentType
    genres: Array<Genre>
    countries: Array<Country>
    actors: Array<Actor>
    kinopoisk?: string
    imdb?: string
    slug: string
}

export interface MediaContentSchema {
    data: Array<MediaContent>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
    isFetchingAll: boolean
    isFetchingMovie: boolean
    isFetchingAllMovies: boolean
    isSearching: boolean
    isFavouring: boolean
}
