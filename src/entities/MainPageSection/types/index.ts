import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";
import {MainPageSectionType} from "../contants";
import {MediaContent} from "src/entities/MediaContent";
import {Series} from "src/entities/Series";

export interface Media {
    type: MainPageSectionType
    data: MediaContent | Series
}

export interface MainPageSection {
    id: number
    label: string
    media: Array<Media>
}

export interface MainPageSectionSchema {
    data: Array<MainPageSection>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
    isFetchingAll: boolean
}
