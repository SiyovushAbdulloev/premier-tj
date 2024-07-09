import {InputError} from "src/entities/Auth";
import {Pagination} from "src/entities/Country";
import {Subscription} from "src/entities/Subscription";
import {User} from "src/entities/User/types";

export interface SubscriptionRequest {
    id: number
    text: string
    subscription: Subscription
    user: User
    status: string
}

export interface SubscriptionRequestSchema {
    data: Array<SubscriptionRequest>
    pagination: Pagination
    fetching: boolean
    isFetchingOne: boolean
    isApproving: boolean
    isRejecting: boolean
}
