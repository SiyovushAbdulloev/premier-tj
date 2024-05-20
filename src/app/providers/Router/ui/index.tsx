import {Route, Routes} from "react-router-dom";
import React, {Suspense, useCallback} from "react";
import {RoutesConfig, RoutesConfigItem} from "src/shared/config/routes";
import {PageLoader} from 'src/shared/ui/PageLoader'
import {ProjectLayouts} from "src/shared/config/layouts";
import {AppLayout} from 'src/app/layouts/App'
import {AuthLayout} from 'src/app/layouts/Auth'
import RequireAuthentication from "src/app/providers/Router/ui/RequireAuthentication";
import RequireAuthorization from "src/app/providers/Router/ui/RequireAuthorization";
import AdminLayout from "src/app/layouts/Admin/ui";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: RoutesConfigItem): React.JSX.Element => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.element}
            </Suspense>
        )
        let elem

        switch (route.layout) {
            case ProjectLayouts.AppLayout:
                elem = (
                    <AppLayout>{element}</AppLayout>
                )
                break
            case ProjectLayouts.AdminLayout:
                elem = (
                    <AdminLayout>{element}</AdminLayout>
                )
                break
            case ProjectLayouts.AuthLayout:
                elem = (
                    <AuthLayout>{element}</AuthLayout>
                )
                break
            default:
                elem = (
                    <AppLayout>{element}</AppLayout>
                )
                break
        }

        elem = (
            <RequireAuthentication route={route}>{elem}</RequireAuthentication>
        )

        elem = (
            <RequireAuthorization
                roles={route.roles}
                route={route}
            >
                {elem}
            </RequireAuthorization>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={elem} />
        )
    }, [])

    return (
        <Routes>
            {Object.values(RoutesConfig).map(renderWithWrapper)}
        </Routes>
    )
}

export default AppRouter
