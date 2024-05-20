import classes from './index.module.css'
import React from "react";
import Logo from 'src/shared/assets/images/logo.png'
import {ReactComponent as Genre} from 'src/shared/assets/icons/genre.svg'
import {ReactComponent as Analytics} from 'src/shared/assets/icons/analytics.svg'
import {ReactComponent as Multimedia} from 'src/shared/assets/icons/movie.svg'
import {ReactComponent as Subscriptions} from 'src/shared/assets/icons/shield.svg'
import {ReactComponent as Countries} from 'src/shared/assets/icons/globe.svg'
import {ReactComponent as Actors} from 'src/shared/assets/icons/user.svg'
import {Link, useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";

const AdminLayout = (props: React.PropsWithChildren) => {
    const navigate = useNavigate()

    const goMain = () => {
        navigate(RoutesConfig.main.path)
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
                    <button className={classes.logout}>Выход</button>
                </div>
            </div>
            <div className={classes.sidebar}>
                <Link to={'/'} className={classes.sidebarItem}>
                    <Analytics
                        width={20}
                        height={20}
                    />
                    <span>Аналитика</span>
                </Link>
                <Link to={'/'} className={classes.sidebarItem}>
                    <Multimedia
                        width={20}
                        height={20}
                    />
                    <span>Мультимедиа</span>
                </Link>
                <Link to={'/'} className={classes.sidebarItem}>
                    <Subscriptions
                        width={20}
                        height={20}
                    />
                    <span>Подписки</span>
                </Link>
                <Link to={RoutesConfig.admin_countries.path} className={classes.sidebarItem}>
                    <Countries
                        width={20}
                        height={20}
                    />
                    <span>Страны</span>
                </Link>
                <Link to={'/'} className={classes.sidebarItem}>
                    <Genre
                        width={20}
                        height={20}
                    />
                    <span>Жанры</span>
                </Link>
                <Link to={'/'} className={classes.sidebarItem}>
                    <Actors
                        width={20}
                        height={20}
                    />
                    <span>Актеры</span>
                </Link>
            </div>
            <div className={classes.children}>
                {props.children}
            </div>
        </div>
    )
}

export default AdminLayout
