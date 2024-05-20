import {Permissions} from "src/shared/config/routes/permissions";

export interface Permission {
    id: number
    name: Permissions
    description: string
}

export interface Role {
    id: number
    name: string
    permissions?: Array<Permission>
}

export interface RoleSchema {
    data: Array<Role>
}
