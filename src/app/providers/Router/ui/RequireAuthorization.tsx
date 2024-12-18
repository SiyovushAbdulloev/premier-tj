import {useSelector} from "react-redux";
import {useLocation, Navigate} from "react-router-dom";
import {RoutesConfigItem, RoutesPath} from "src/shared/config/routes";
import {can, getAuthUserData} from "src/entities/User";
import React from "react";
import {User} from "src/entities/User/types";

interface RequireAuthorizationProps {
    children: React.JSX.Element
    route: RoutesConfigItem
}

const RequireAuthorization = (props: RequireAuthorizationProps): any => {
    const authData: User|undefined = useSelector(getAuthUserData)
    const location = useLocation()

    if (props.route.roles.length) {
        if (authData === undefined && !props.route.allow_without_auth) {
            return <Navigate to={RoutesPath.main} state={{from: location}}/>
        }
        if (authData && !can(props.route.roles, authData.roles)) {
            return <Navigate to={RoutesPath.unauthorized} state={{from: location}}/>
        }
    }

    return props.children
}

export default RequireAuthorization
