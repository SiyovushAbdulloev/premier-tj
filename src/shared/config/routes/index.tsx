import {AdminMainPage} from "src/pages/AdminMain";
import {UnauthorizedPage} from "src/pages/Unauthorized";
import {RouteProps} from "react-router-dom";
import React from "react";
import {ProjectLayouts} from "src/shared/config/layouts";
import {Roles} from "./roles";
import {CountriesPage} from "src/pages/Countries";
import {CountriesCreatePage} from "src/pages/CountriesCreate";
import {CountriesEditPage} from "src/pages/CountriesEdit";
import {MainPage} from "src/pages/Main";
import {AdminLoginPage} from "src/pages/AdminLogin";
import {NotFoundPage} from "src/pages/NotFound";

export type RoutesConfigItem = RouteProps & {
    element: React.JSX.Element
    require_auth: boolean
    allow_without_auth: boolean
    layout: ProjectLayouts
    roles: Array<Roles>
    path: string
}

export enum AppRoutes {
    'MAIN' = 'main',
    'ADMIN_MAIN' = 'admin_main',
    'ADMIN_LOGIN' = 'admin_login',
    'ADMIN_COUNTRIES' = 'admin_countries',
    'ADMIN_COUNTRIES_CREATE' = 'admin_countries_create',
    'ADMIN_COUNTRIES_EDIT' = 'admin_countries_edit',
    'UNAUTHORIZED' = 'unauthorized',
    'NOT_FOUND' = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN_MAIN]: '/admin',
    [AppRoutes.ADMIN_LOGIN]: '/admin/login',
    [AppRoutes.ADMIN_COUNTRIES]: '/admin/countries',
    [AppRoutes.ADMIN_COUNTRIES_CREATE]: '/admin/countries/create',
    [AppRoutes.ADMIN_COUNTRIES_EDIT]: '/admin/countries/:id/edit',
    [AppRoutes.UNAUTHORIZED]: '/unauthorized',
    [AppRoutes.NOT_FOUND]: '*',
}

export const RoutesConfig: Record<AppRoutes, RoutesConfigItem> = {
    [AppRoutes.MAIN]: {
        path: RoutesPath.main,
        element: <MainPage/>,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: []
    },
    [AppRoutes.ADMIN_MAIN]: {
        path: RoutesPath.admin_main,
        element: <AdminMainPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_LOGIN]: {
        path: RoutesPath.admin_login,
        element: <AdminLoginPage/>,
        require_auth: false,
        allow_without_auth: true,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
    [AppRoutes.ADMIN_COUNTRIES]: {
        path: RoutesPath.admin_countries,
        element: <CountriesPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_COUNTRIES_CREATE]: {
        path: RoutesPath.admin_countries_create,
        element: <CountriesCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_COUNTRIES_EDIT]: {
        path: RoutesPath.admin_countries_edit,
        element: <CountriesEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.UNAUTHORIZED]: {
        path: RoutesPath.unauthorized,
        element: <UnauthorizedPage/>,
        require_auth: false,
        allow_without_auth: false,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutesPath.not_found,
        element: <NotFoundPage/>,
        require_auth: false,
        allow_without_auth: false,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
}
