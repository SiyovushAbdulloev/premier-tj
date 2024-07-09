import {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsFetchingOne,
    getIsUpdating,
    getIsFetchingAll,
    getIsFetchingPages,
} from "./model/selectors";
import {pageSectionActions, pageSectionReducer} from "./model/slice";
import {PageSection, PageSectionSchema, Page} from "./types";
import {PageSectionType} from "./contants";
import {getPageSections} from "./model/services/getPageSections";
import {getPageSection} from "./model/services/getPageSection";
import {storePageSection} from "./model/services/storePageSection";
import {updatePageSection} from "./model/services/updatePageSection";
import {destroyPageSection} from "./model/services/destroyPageSection";
import {getAllPageSections} from "./model/services/getAllPageSections";
import {getPages} from "./model/services/getPages";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getPageSection,
    pageSectionReducer,
    pageSectionActions,
    getPageSections,
    storePageSection,
    updatePageSection,
    destroyPageSection,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
    PageSectionType,
    getAllPageSections,
    getIsFetchingAll,
    getPages,
    getIsFetchingPages,
}
export type {PageSection, PageSectionSchema, Page}
