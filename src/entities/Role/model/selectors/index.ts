import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {Role} from "../../types";

export const getRolesData = (state: StateSchema): Array<Role> => state.role.data