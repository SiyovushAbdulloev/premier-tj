import React, {useMemo, useState} from "react";
import classes from './index.module.css'
import Logo from 'src/shared/assets/images/logo.png'
import {ReactComponent as Burger} from 'src/shared/assets/icons/burger.svg'
import {ReactComponent as Home} from 'src/shared/assets/icons/home.svg'
import {ReactComponent as Discount} from 'src/shared/assets/icons/discount.svg'
import {ReactComponent as User} from 'src/shared/assets/icons/user.svg'
import {ReactComponent as Settings} from 'src/shared/assets/icons/settings.svg'
import {ReactComponent as Favourites} from 'src/shared/assets/icons/favourites.svg'
import {ReactComponent as Play} from 'src/shared/assets/icons/play.svg'
import {ReactComponent as PaymentType} from 'src/shared/assets/icons/credit_card.svg'
import {ReactComponent as Logout} from 'src/shared/assets/icons/logout.svg'
import {ReactComponent as Building} from 'src/shared/assets/icons/building.svg'
import {SearchInput} from "src/shared/ui/SearchInput";
import {className} from "src/shared/utils/className";
import {useSelector} from "react-redux";
import {getAuthUserData, userActions} from "src/entities/User";
import {Roles} from "src/shared/config/routes/roles";
import {useNavigate} from 'react-router-dom'
import {RoutesConfig} from "src/shared/config/routes";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {logoutAdmin} from "src/entities/Auth";
import {ModalNav} from "src/shared/ui/ModalNav";
import {ReactComponent as Cancel} from "src/shared/assets/icons/cancel.svg"

const navigations = [
    {
        name: 'movies',
        label: 'Фильмы',
        children: [
            {
                name: 'foreign',
                label: 'Зарубежные фильмы',
            },
            {
                name: 'russian',
                label: 'Российские фильмы',
            },
            {
                name: 'tajik',
                label: 'Таджикские фильмы',
            },
            {
                name: '2023',
                label: 'Фильмы 2023',
            },
            {
                name: '2022',
                label: 'Фильмы 2022',
            },
        ]
    },
    {
        name: 'series',
        label: 'Сериалы',
        children: [
            {
                name: 'foreign',
                label: 'Зарубежные сериалы',
            },
            {
                name: 'russian',
                label: 'Российские сериалы',
            },
            {
                name: 'tajik',
                label: 'Таджикские сериалы',
            },
            {
                name: '2023',
                label: 'Сериалы 2023',
            },
            {
                name: '2022',
                label: 'Сериалы 2022',
            },
        ]
    },
    {
        name: 'multimedias',
        label: 'Шоу',
        children: [
            {
                name: 'foreign',
                label: 'Зарубежные шоу',
            },
            {
                name: 'russian',
                label: 'Российские шоу',
            },
            {
                name: 'tajik',
                label: 'Таджикские шоу',
            },
            {
                name: '2023',
                label: 'Шоу 2023',
            },
            {
                name: '2022',
                label: 'Шоу 2022',
            },
        ]
    },
]

const AppNavbar = (props: React.PropsWithChildren) => {
    const [showUser, setShowUser] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [navItem, setNavItem] = useState<string>('movies')
    const authData = useSelector(getAuthUserData)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const goAdmin = () => {
        navigate(RoutesConfig.admin_main.path)
    }

    const logout = async () => {
        const data = await dispatch(logoutAdmin())
        if (data.type.includes('fulfilled')) {
            dispatch(userActions.setAuthData(undefined))
            navigate(RoutesConfig.main.path)
        }
    }

    const onMain = () => {
        navigate(RoutesConfig.main.path)
    }

    const onNavItem = (item: string) => {
        setNavItem(item)
    }

    const onNavItemPage = (navItem: string) => {
        switch (navItem) {
            case 'movies':
                navigate(RoutesConfig.movies_list.path)
                break
            case 'multimedias':
                navigate(RoutesConfig.multimedias_list.path)
                break
            case 'series':
                navigate(RoutesConfig.series_list.path)
                break
        }
        setShowMenu(false)
    }

    const subItems = useMemo(() => {
        return navigations.find(nav => nav.name === navItem)?.children ?? []
    }, [navItem])

    return (
        <div className={classes.navbar}>
            <div onClick={onMain}>
                <img
                    className={classes.brand}
                    src={Logo}
                    alt="Premier-TJ"
                />
            </div>
            <div className={classes.burgerMenu}>
                <div
                    className={classes.burger}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    {showMenu ? (
                        <Cancel
                            width={20}
                            height={20}
                        />
                        ) : (
                        <Burger
                            width={20}
                            height={20}
                        />
                    )}
                    Каталог
                </div>
                <ModalNav
                    style={{right: '-230px', padding: '0'}}
                    value={showMenu}
                    onChange={(value: boolean) => setShowMenu(value)}
                >
                    <div className={classes.categoriesMenu}>
                        <div className={classes.categories}>
                            {navigations.map(nav => (
                                <div
                                    onMouseEnter={() => onNavItem(nav.name)}
                                    key={nav.name}
                                    className={classes.category}
                                    onClick={() => onNavItemPage(nav.name)}
                                >
                                    {nav.label}
                                </div>
                            ))}
                        </div>
                        <div className={classes.categories}>
                            {subItems.map(child => (
                                <div
                                    key={`${navItem}${child.name}`}
                                    className={classes.category}
                                >
                                    {child.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </ModalNav>
            </div>
            <SearchInput
                placeholder={'Фильм, актер, жанр'}
                style={{
                'width': '473px',
                'height': '40px',
                'marginLeft': '60px',
            }} />
            <ul className={classes.navItems}>
                <li className={classes.navItem}>
                    <Home width={24} height={24} />
                    Главная
                </li>
                <li className={classes.navItem}>
                    <Discount width={24} height={24} />
                    Бесплатно
                </li>
            </ul>
            <button
                className={classes.subscribe}
                type={'button'}
            >
                30 дней за 1 сом
            </button>
            {authData && (
                <div className={classes.user}>
                    <button
                        type={'button'}
                        onClick={() => setShowUser(!showUser)}
                        className={classes.userBtn}
                    >
                        <User width={32} height={32} />
                    </button>
                    <ModalNav
                        value={showUser}
                        onChange={(value: boolean) => setShowUser(value)}
                    >
                        {authData.roles[0].name !== Roles.ADMIN ? (
                            <>
                                <div className={classes.profile}>
                                    <button
                                        type={'button'}
                                        onClick={() => setShowUser(!showUser)}
                                        className={className(classes.userBtn, {[classes.profileBtn]: true})}
                                    >
                                        <User width={32} height={32} />
                                    </button>
                                    +992989335555
                                </div>
                                <ul className={classes.profileItems}>
                                    <div className={classes.profileItem}>
                                        <Settings width={24} height={24} />
                                        Настройки профиля
                                    </div>
                                    <div className={classes.profileItem}>
                                        <Favourites width={24} height={24} />
                                        Избранное
                                    </div>
                                    <div className={classes.profileItem}>
                                        <Play width={24} height={24} />
                                        Мои подписки
                                    </div>
                                    <div className={classes.profileItem}>
                                        <PaymentType width={24} height={24} />
                                        Способы оплата
                                    </div>
                                    <div
                                        className={classes.profileItem}
                                        onClick={logout}
                                    >
                                        <Logout width={24} height={24} />
                                        Выйти из аккаунта
                                    </div>
                                </ul>
                            </>
                        ) : (
                            <ul className={classes.profileItems}>
                                <div
                                    onClick={goAdmin}
                                    className={classes.profileItem}
                                >
                                    <Building width={24} height={24} />
                                    Админка
                                </div>
                                <div
                                    className={classes.profileItem}
                                    onClick={logout}
                                >
                                    <Logout width={24} height={24} />
                                    Выйти из аккаунта
                                </div>
                            </ul>
                        )}
                    </ModalNav>
                </div>
            )}
        </div>
    )
}

export default AppNavbar
