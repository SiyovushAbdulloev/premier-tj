import {
    getData,
    getPagination,
    getFetching,
    getIsFetchingAll,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
} from "./model/selectors";
import {socialLinkReducer, socialLinkActions} from "./model/slice";
import {SocialLink, SocialLinkSchema, Pagination} from "./types";
import {getLinks} from "./model/services/getLinks";
import {getLink} from "./model/services/getLink";
import {updateLink} from "./model/services/updateLink";
import {getAllLinks} from "./model/services/getAllLinks";

export {
    getData,
    getPagination,
    getFetching,
    socialLinkReducer,
    socialLinkActions,
    getIsFetchingAll,
    getUpdateErrors,
    getIsUpdating,
    getLinks,
    getLink,
    getAllLinks,
    updateLink,
    getIsFetchingOne,
}
export type {SocialLink, SocialLinkSchema, Pagination}
