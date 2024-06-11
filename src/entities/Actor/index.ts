import {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsUpdating,
    getIsFetchingAll,
} from "./model/selectors";
import {actorActions, actorReducer} from "./model/slice";
import {Actor, ActorSchema} from "./types";
import {getActors} from "./model/services/getActors";
import {getActor} from "./model/services/getActor";
import {destroyActor} from "./model/services/destroyActor";
import {storeActor} from "./model/services/storeActor";
import {updateActor} from "./model/services/updateActor";
import {getAllActors} from "./model/services/getAllActors";

export {
    getData,
    getPagination,
    getFetching,
    getIsStoring,
    getStoreErrors,
    getUpdateErrors,
    getIsUpdating,
    actorReducer,
    actorActions,
    getActor,
    getActors,
    destroyActor,
    storeActor,
    updateActor,
    getIsFetchingAll,
    getAllActors,
}
export type {Actor, ActorSchema}
