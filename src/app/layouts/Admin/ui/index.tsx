import classes from './index.module.css'
import React, {useMemo} from "react";
import Logo from 'src/shared/assets/images/logo.png'
import {ReactComponent as Genre} from 'src/shared/assets/icons/genre.svg'
import {ReactComponent as Analytics} from 'src/shared/assets/icons/analytics.svg'
import {ReactComponent as Multimedia} from 'src/shared/assets/icons/movie.svg'
import {ReactComponent as Subscriptions} from 'src/shared/assets/icons/shield.svg'
import {ReactComponent as Countries} from 'src/shared/assets/icons/globe.svg'
import {ReactComponent as Actors} from 'src/shared/assets/icons/user.svg'
import {ReactComponent as Mail} from 'src/shared/assets/icons/mail.svg'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {className} from "src/shared/utils/className";
import {logoutAdmin} from "src/entities/Auth";
import {userActions} from "src/entities/User";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";

const AdminLayout = (props: React.PropsWithChildren) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()

    const goMain = () => {
        navigate(RoutesConfig.main.path)
    }

    const items = useMemo(() => {
        return [
            {
                path: RoutesConfig.admin_main.path,
                icon: function () {
                    return <Analytics width={20} height={20} />
                },
                label: 'Аналитика'
            },
            {
                path: RoutesConfig.admin_movies.path,
                icon: function () {
                    return <Multimedia width={20} height={20} />
                },
                label: 'Кино'
            },
            {
                path: RoutesConfig.admin_multimedias.path,
                icon: function () {
                    return <Multimedia width={20} height={20} />
                },
                label: 'Standup, новости...'
            },
            {
                path: RoutesConfig.admin_series.path,
                icon: function () {
                    return <Multimedia width={20} height={20} />
                },
                label: 'Сериалы'
            },
            {
                path: RoutesConfig.admin_page_sections.path,
                icon: function () {
                    return <Genre width={20} height={20} />
                },
                label: 'Категории'
            },
            {
                path: RoutesConfig.admin_subscriptions.path,
                icon: function () {
                    return <Subscriptions width={20} height={20} />
                },
                label: 'Подписки'
            },
            {
                path: RoutesConfig.admin_countries.path,
                icon: function () {
                    return <Countries width={20} height={20} />
                },
                label: 'Страны'
            },
            {
                path: RoutesConfig.admin_genres.path,
                icon: function () {
                    return <Genre width={20} height={20} />
                },
                label: 'Жанры'
            },
            {
                path: RoutesConfig.admin_actors.path,
                icon: function () {
                    return <Actors width={20} height={20} />
                },
                label: 'Актеры'
            },
            {
                path: RoutesConfig.admin_subscription_requests.path,
                icon: function () {
                    return <Mail width={20} height={20} />
                },
                label: 'Заявки'
            },
        ]
    }, [])

    const logout = async () => {
        const data = await dispatch(logoutAdmin())
        if (data.type.includes('fulfilled')) {
            dispatch(userActions.setAuthData(undefined))
            navigate(RoutesConfig.main.path)
        }
    }

    return (
        <div className={classes.adminLayout}>
            <div className={classes.navbar}>
                <img
                    onClick={goMain}
                    className={classes.brand}
                    src={Logo}
                    alt="Logo"
                />
                <div className={classes.user}>
                    <h5 className={classes.username}>Admin</h5>
                    <button onClick={logout} className={classes.logout}>Выход</button>
                </div>
            </div>
            <div className={classes.sidebar}>
                {items.map(item => {
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={className(classes.sidebarItem, {[classes.active]: location.pathname === item.path})}
                        >
                            {item.icon()}
                            <span>{item.label}</span>
                        </Link>
                    )
                })}
            </div>
            <div className={classes.children}>
                {props.children}
            </div>
        </div>
    )
}

export default AdminLayout
