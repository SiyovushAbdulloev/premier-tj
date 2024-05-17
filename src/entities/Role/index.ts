import {RoleSchema, Role, Permission} from "./types";
import {roleActions, roleReducer} from "./model/slice";
import {getRolesData} from "./model/selectors";

export type {RoleSchema, Role, Permission}
export {roleActions, roleReducer, getRolesData}