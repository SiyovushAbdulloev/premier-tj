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
} from "./model/selectors";
import {mainPageSectionActions, mainPageSectionReducer} from "./model/slice";
import {MainPageSection, MainPageSectionSchema} from "./types";
import {MainPageSectionType} from "./contants";
import {getMainPageSections} from "./model/services/getMainPageSections";
import {getMainPageSection} from "./model/services/getMainPageSection";
import {storeMainPageSection} from "./model/services/storeMainPageSection";
import {updateMainPageSection} from "./model/services/updateMainPageSection";
import {destroyMainPageSection} from "./model/services/destroyMainPageSection";
import {getAllMainPageSections} from "./model/services/getAllMainPageSections";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getMainPageSection,
    mainPageSectionReducer,
    mainPageSectionActions,
    getMainPageSections,
    storeMainPageSection,
    updateMainPageSection,
    destroyMainPageSection,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingOne,
    MainPageSectionType,
    getAllMainPageSections,
    getIsFetchingAll,
}
export type {MainPageSection, MainPageSectionSchema}
