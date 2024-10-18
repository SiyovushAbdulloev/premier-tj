import classes from './index.module.css'
import React from "react";
import AppNavbar from "src/widgets/AppNavbar/ui";
import {RoutesConfig} from "src/shared/config/routes";
import {Link, useNavigate} from "react-router-dom";
import {ReactComponent as Telegram} from "src/shared/assets/icons/telegram.svg"
import {ReactComponent as VK} from "src/shared/assets/icons/vk.svg"
import {ReactComponent as OK} from "src/shared/assets/icons/ok.svg"
import {ReactComponent as Whatsapp} from "src/shared/assets/icons/whatsapp.svg"
import {ReactComponent as Dzen} from "src/shared/assets/icons/dzen.svg"
import {ReactComponent as AppStore} from "src/shared/assets/icons/app_store.svg"
import {ReactComponent as AllDevices} from "src/shared/assets/icons/all_devices.svg"
import {ReactComponent as AppGallery} from "src/shared/assets/icons/app_gallery.svg"
import {ReactComponent as GetApps} from "src/shared/assets/icons/get_apps.svg"
import {ReactComponent as GooglePlay} from "src/shared/assets/icons/google_play.svg"
import {ReactComponent as RuStore} from "src/shared/assets/icons/ru_store.svg"
import {ReactComponent as SmartTV} from "src/shared/assets/icons/smart_tv.svg"
import {className} from "src/shared/utils/className";

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
                    <div>
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
                </div>
                <div className={classes.socialsSection}>
                    <h3 className={classes.navGroupLabel}>Смотрите фильмы, сериалы и шоу на любом устройстве</h3>
                    <div className={classes.platforms}>
                            <Link to={''} className={classes.platformItem}>
                                <AppStore className={classes.platformItemSvg} />
                            </Link>
                            <Link to={''} className={classes.platformItem}>
                                <GooglePlay className={classes.platformItemSvg} />
                            </Link>
                            <Link to={''} className={classes.platformItem}>
                                <AppGallery className={classes.platformItemSvg} />
                            </Link>
                            <Link to={''} className={classes.platformItem}>
                                <GetApps className={classes.platformItemSvg} />
                            </Link>
                            <Link to={''} className={classes.platformItem}>
                                <RuStore className={classes.platformItemSvg} />
                            </Link>
                            <Link to={''} className={classes.platformItem}>
                                <SmartTV className={classes.platformItemSvg} />
                            </Link>
                        <div className={classes.platform}>
                            <Link to={''} className={className(classes.platformItem, null, [classes.allDevices])}>
                                <AllDevices />
                            </Link>
                        </div>
                    </div>
                    <h3 className={classes.socialsTitle}>Мы в соцсетях:</h3>
                    <div className={classes.socials}>
                        <Link to={''} className={classes.social}>
                            <Telegram width={22} height={22} />
                        </Link>
                        <Link to={''} className={classes.social}>
                            <VK width={22} height={22} />
                        </Link>
                        <Link to={''} className={classes.social}>
                            <OK width={22} height={22} />
                        </Link>
                        <Link to={''} className={classes.social}>
                            <Whatsapp width={22} height={22} fill={'#fff'} />
                        </Link>
                        <Link to={''} className={classes.social}>
                            <Dzen width={22} height={22} fill={'#fff'} />
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AppLayout
