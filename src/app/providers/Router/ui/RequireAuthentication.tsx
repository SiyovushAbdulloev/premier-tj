import {useSelector} from "react-redux";
import {useLocation, Navigate} from "react-router-dom";
import {RoutesConfig, RoutesConfigItem, RoutesPath} from "src/shared/config/routes";
import {getAuthUserData} from "src/entities/User";
import React from "react";
import {Roles} from "src/shared/config/routes/roles";

interface RequireAuthenticationProps extends React.PropsWithChildren {
    route: RoutesConfigItem
}

const RequireAuthentication = (props: RequireAuthenticationProps): any => {
    const authData = useSelector(getAuthUserData)
    const location = useLocation()
    console.log({authData})
    if (props.route.require_auth) {
        if (authData === undefined && !props.route.allow_without_auth) {
            return <Navigate to={RoutesPath.main} state={{from: location}}/>
        }
    }
    // if (authData !== undefined && !props.route.require_auth) {
    //     if (authData.roles[0].name === Roles.ADMIN) {
    //         return <Navigate to={RoutesConfig.admin_main.path} state={{from: location.pathname}}/>
    //     } else {
    //         return <Navigate to={RoutesConfig.main.path} state={{from: location.pathname}}/>
    //     }
    // }

    return props.children
}

export default RequireAuthentication
