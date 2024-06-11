import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";

export interface Subscription {
    id: number
    name: string
    description: string
    price: number
    duration: number
    promotional_price: null | number
    promotional_duration: null | number
}

export interface SubscriptionSchema {
    data: Array<Subscription>
    pagination: Pagination
    fetching: boolean
    isStoring: boolean
    storeErrors: InputError | undefined
    isUpdating: boolean
    updateErrors: InputError | undefined
    isFetchingOne: boolean
    isFetchingAll: boolean
}
