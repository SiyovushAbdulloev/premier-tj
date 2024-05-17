import {Role} from "src/entities/Role";
import {Roles} from "src/shared/config/routes/roles";

export const can = (roles: Array<Roles>, userRoles: Array<Role>): boolean => {
    let can = false

    userRoles.forEach((role: Role) => {
        if (roles.includes(role.name as Roles)) {
            can = true
        }
    })
    return can
}