import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";
import {PageSectionType} from "../contants";
import {MediaContent} from "src/entities/MediaContent";
import {Series} from "src/entities/Series";

export interface Media {
    type: PageSectionType
    data: MediaContent | Series
}

export interface Page {
    value: string
    label: string
}

export interface PageSection {
    id: number
    label: string
    media: Array<Media>
    page: Page
    ad_url?: string
}

export interface PageSectionSchema {
    data: Array<PageSection>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
    isFetchingAll: boolean
    isFetchingPages: boolean
}
