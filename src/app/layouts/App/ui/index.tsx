import classes from './index.module.css'
import React from "react";
import AppNavbar from "src/widgets/AppNavbar/ui";
import {RoutesConfig} from "src/shared/config/routes";
import {useNavigate} from "react-router-dom";

const AppLayout = (props: React.PropsWithChildren) => {
    const navigate = useNavigate()

    const onFree = () => {
        navigate(RoutesConfig.free_media.path)
    }

    return (
        <div className={classes.appLayout}>
            <AppNavbar />
            {props.children}
            <footer className={classes.footer}>
                <div className={classes.footerWrapper}>
                    <div className={classes.footerNav}>
                        <div className={classes.navGroup}>
                            <h3 className={classes.navGroupLabel}>Разделы</h3>
                            <ul className={classes.navItems}>
                                <li className={classes.navItem}>Главная</li>
                                <li className={classes.navItem} onClick={onFree}>Бесплатно</li>
                            </ul>
                        </div>
                        <div className={classes.navGroup}>
                            <h3 className={classes.navGroupLabel}>Информация</h3>
                            <ul className={classes.navItems}>
                                <li className={classes.navItem}>Пользовательское соглашение</li>
                                <li className={classes.navItem}>Политика конфиденциальности</li>
                                <li className={classes.navItem}>Частые вопросы</li>
                            </ul>
                        </div>
                    </div>
                    <p className={classes.copyright}>
                        Copyright 2024 ©PREMIER-TJ. Все права защищены
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default AppLayout
