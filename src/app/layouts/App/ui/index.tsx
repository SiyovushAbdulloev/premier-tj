import classes from './index.module.css'
import React, {useEffect, useState} from "react";
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
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getAllLinks, SocialLink} from "src/entities/SocialLink";

const AppLayout = (props: React.PropsWithChildren) => {
    const [socialLinks, setSocialLinks] = useState<Array<SocialLink>>([])
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onFree = () => {
        navigate(RoutesConfig.free_media.path)
    }

    useEffect(() => {
        const getLinks = async () => {
            const response = await dispatch(getAllLinks())
            if (response.type.includes('fulfilled')) {
                setSocialLinks(response.payload.data)
            }
        }

        getLinks()
    }, [])

    const getLink = (name: string): string => {
        if (!socialLinks.length) return ''
        return socialLinks.find((socialLink: SocialLink) => socialLink.name === name)?.path ?? ''
    }

    return (
        <div className={classes.appLayout}>
            <AppNavbar/>
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
                        {getLink('app_store') ? (
                            <Link
                                to={getLink('app_store')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <AppStore className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        {getLink('google_play') ? (
                            <Link
                                to={getLink('google_play')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <GooglePlay className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        {getLink('app_gallery') ? (
                            <Link
                                to={getLink('app_gallery')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <AppGallery className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        {getLink('get_apps') ? (
                            <Link
                                to={getLink('get_apps')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <GetApps className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        {getLink('ru_store') ? (
                            <Link
                                to={getLink('ru_store')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <RuStore className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        {getLink('smart_tv') ? (
                            <Link
                                to={getLink('smart_tv')}
                                className={classes.platformItem}
                                target={'_blank'}
                            >
                                <SmartTV className={classes.platformItemSvg}/>
                            </Link>
                        ) : null}
                        <div className={classes.platform}>
                            <Link
                                to={''}
                                className={className(classes.platformItem, null, [classes.allDevices])}
                                target={'_blank'}
                            >
                                <AllDevices/>
                            </Link>
                        </div>
                    </div>
                    <h3 className={classes.socialsTitle}>Мы в соцсетях:</h3>
                    <div className={classes.socials}>
                        {getLink('telegram') ? (
                            <Link
                                to={getLink('telegram')}
                                className={classes.social}
                                target={'_blank'}
                            >
                                <Telegram width={22} height={22}/>
                            </Link>
                        ) : null}
                        {getLink('vk') ? (
                            <Link
                                to={getLink('vk')}
                                className={classes.social}
                                target={'_blank'}
                            >
                                <VK width={22} height={22}/>
                            </Link>
                        ) : null}
                        {getLink('ok') ? (
                            <Link
                                to={getLink('ok')}
                                className={classes.social}
                                target={'_blank'}
                            >
                                <OK width={22} height={22}/>
                            </Link>
                        ) : null}
                        {getLink('whatsapp') ? (
                            <Link
                                to={getLink('whatsapp')}
                                className={classes.social}
                                target={'_blank'}
                            >
                                <Whatsapp width={22} height={22}/>
                            </Link>
                        ) : null}
                        {getLink('dzen') ? (
                            <Link
                                to={getLink('dzen')}
                                className={classes.social}
                                target={'_blank'}
                            >
                                <Dzen width={22} height={22}/>
                            </Link>
                        ) : null}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AppLayout
