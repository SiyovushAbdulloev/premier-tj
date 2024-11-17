import React, {useEffect, useMemo, useRef, useState} from "react";
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
import {ReactComponent as Google} from 'src/shared/assets/icons/google.svg'
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
import {
    checkLoginOTP,
    getIsCheckingOtp, getIsGoogleAuth,
    getIsSendingOTP,
    getOtpErrors, google,
    logoutAdmin,
    logoutUser,
    sendLoginOtp,
    sendRegisterOtp,
} from "src/entities/Auth";
import {ModalNav} from "src/shared/ui/ModalNav";
import {ReactComponent as Cancel} from "src/shared/assets/icons/cancel.svg"
import {NativeModal} from "src/shared/ui/NativeModal";
import {ReactComponent as Back} from "src/shared/assets/icons/back.svg"
import OTPInput from "react-otp-input";
import {checkRegisterOTP} from "src/entities/Auth/model/services/checkRegisterOTP";
import {ReactComponent as Search} from "src/shared/assets/icons/search.svg"
import {Checkbox} from "src/shared/ui/Checkbox";

const navigations = [
    {
        value: 'movies',
        label: 'Фильмы',
        children: [
            {
                value: 'foreign',
                label: 'Зарубежные фильмы',
                type: 'country'
            },
            {
                value: 'rus',
                label: 'Российские фильмы',
                type: 'country'
            },
            {
                value: 'tjk',
                label: 'Таджикские фильмы',
                type: 'country'
            },
            {
                value: '2023',
                label: 'Фильмы 2023',
                type: 'year'
            },
            {
                value: '2022',
                label: 'Фильмы 2022',
                type: 'year'
            },
        ]
    },
    {
        value: 'series',
        label: 'Сериалы',
        children: [
            {
                value: 'foreign',
                label: 'Зарубежные сериалы',
                type: 'country'
            },
            {
                value: 'rus',
                label: 'Российские сериалы',
                type: 'country'
            },
            {
                value: 'tjk',
                label: 'Таджикские сериалы',
                type: 'country'
            },
            {
                value: '2023',
                label: 'Сериалы 2023',
                type: 'year'
            },
            {
                value: '2022',
                label: 'Сериалы 2022',
                type: 'year'
            },
        ]
    },
    {
        value: 'multimedias',
        label: 'Шоу',
        children: [
            {
                value: '2023',
                label: 'Шоу 2023',
                type: 'year'
            },
            {
                value: '2022',
                label: 'Шоу 2022',
                type: 'year'
            },
        ]
    },
]

const AppNavbar = (props: React.PropsWithChildren) => {
    const [showUser, setShowUser] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [navItem, setNavItem] = useState<string>('movies')
    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showRegister, setShowRegister] = useState<boolean>(false)
    const authData = useSelector(getAuthUserData)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sent, setSent] = useState<boolean>(false)
    const [resent, setResent] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [otp, setOtp] = useState<string>('')
    const [canResend, setCanResend] = useState<boolean>(false)
    const [time, setTime] = useState<number>(60)
    const timerRef = useRef<any>()
    const isSendingEmail = useSelector(getIsSendingOTP)
    const isCheckingOtp = useSelector(getIsCheckingOtp)
    const otpErrors = useSelector(getOtpErrors)
    const isGoogleAuth = useSelector(getIsGoogleAuth)
    const [isForeigner, setIsForeigner] = useState<boolean>(false)

    useEffect(() => {
        if (sent) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 1000)

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current)
                }
            }
        }
    }, [sent])

    useEffect(() => {
        if (resent) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 100)

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current)
                }
            }
        }
    }, [resent])

    useEffect(() => {
        if (time === 0) {
            clearInterval(timerRef.current)
            timerRef.current = null
            setCanResend(true)
            setResent(false)
        }
    }, [time])

    const onForeigner = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsForeigner(e.target.checked)
    }

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

    const logoutSimpleUser = async () => {
        const data = await dispatch(logoutUser())
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

    const onSubNavItemPage = (subNavItem: any) => {
        switch (navItem) {
            case 'movies':
                navigate(RoutesConfig.movies_list.path, {state: {type: subNavItem.type, value: subNavItem.value}})
                break
            case 'multimedias':
                navigate(RoutesConfig.multimedias_list.path, {state: {type: subNavItem.type, value: subNavItem.value}})
                break
            case 'series':
                navigate(RoutesConfig.series_list.path, {state: {type: subNavItem.type, value: subNavItem.value}})
                break
        }
        setShowMenu(false)
    }

    const subItems = useMemo(() => {
        return navigations.find(nav => nav.value === navItem)?.children ?? []
    }, [navItem])

    const onFree = () => {
        navigate(RoutesConfig.free_media.path)
    }

    const onHome = () => {
        navigate(RoutesConfig.main.path)
    }

    const onSearch = () => {
        navigate(RoutesConfig.search.path)
    }

    const onLogin = () => {
        setShowLogin(true)
    }

    const onRegisterContinue = async () => {
        const response = await dispatch(sendRegisterOtp({phone}))
        if (response.type.includes('fulfilled')) {
            setSent(true)
        }
    }

    const onLoginContinue = async () => {
        const response = await dispatch(sendLoginOtp({phone}))
        if (response.type.includes('fulfilled')) {
            setSent(true)
        }
    }

    const onLoginModal = (value: boolean) => {
        setShowLogin(value)
        setSent(false)
        onBack()
        setPhone('')
    }

    const onRegisterModal = (value: boolean) => {
        setShowRegister(value)
    }

    const onBack = () => {
        setSent(false)
        setResent(false)
        setCanResend(false)
        clearInterval(timerRef.current)
        timerRef.current = null
        setTime(60)
        setOtp('')
    }

    const onLoginSend = async () => {
        const response = await dispatch(checkLoginOTP({
            phone,
            otp
        }))
        if (response.type.includes('fulfilled')) {
            await dispatch(userActions.setAuthData(response.payload.user))
            onLoginModal(false)
            setShowUser(false)
        }
    }

    const onRegisterSend = async () => {
        const response = await dispatch(checkRegisterOTP({
            phone,
            firstname: firstname,
            lastname: lastname,
            otp
        }))
        if (response.type.includes('fulfilled')) {
            await dispatch(userActions.setAuthData(response.payload.user))
            onRegisterModal(false)
            setShowUser(false)
        }
    }

    const onRegisterResendOTP = async () => {
        const response = await dispatch(sendRegisterOtp({phone}))
        if (response.type.includes('fulfilled')) {
            timerRef.current = null
            setTime(60)
            setCanResend(false)
            setResent(true)
        }
    }

    const onLoginResendOTP = async () => {
        const response = await dispatch(sendLoginOtp({phone}))
        if (response.type.includes('fulfilled')) {
            timerRef.current = null
            setTime(60)
            setCanResend(false)
            setResent(true)
        }
    }

    const onSearchPage = () => {
        navigate(RoutesConfig.search.path)
    }

    const showRegisterModal = () => {
        setPhone('')
        setShowLogin(false)
        setShowRegister(true)
    }

    const onProfile = () => {
        navigate(RoutesConfig.user_profile.path)
        setShowUser(false)
    }

    const onGoogle = async () => {
        const response = await dispatch(google())
        if (response.type.includes('fulfilled')) {
            window.location.href = response.payload.url
        }
    }

    return (
        <div className={classes.navbar}>
            <NativeModal
                value={showLogin}
                onChange={onLoginModal}
            >
                {!sent ? (
                    <div className={classes.loginContent}>
                        <img
                            src={Logo}
                            alt="Brand"
                            className={classes.loginBrand}
                        />
                        <h1 className={classes.loginTitle}>Введите номер телефона</h1>
                        <p className={classes.loginDescription}>
                            чтобы войти на PREMIER-TJ
                        </p>
                        <div className={classes.phoneContainer}>
                            <input
                                className={classes.phone}
                                type="text"
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            />
                            <span className={classes.phoneIdentifier}>+992</span>
                            {otpErrors ? (
                                <div className={classes.errors}>
                                    {otpErrors && Object.keys(otpErrors).map((key: string) => {
                                        return (
                                            <div key={key}>
                                                {otpErrors[key].map((message: string) => {
                                                    return (
                                                        <p
                                                            key={message}
                                                            className={classes.error}
                                                        >
                                                            {message}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : null}
                        </div>
                        <button
                            className={classes.continueBtn}
                            onClick={onLoginContinue}
                            disabled={phone.length === 0}
                        >
                            {isSendingEmail ? (
                                <span className={classes.loader}></span>
                            ) : 'Продолжить'}
                        </button>
                        <p className={classes.registerLabel} onClick={showRegisterModal}>
                            У меня нет аккаунта
                        </p>
                        <Checkbox
                            label={'Не гражданин Таджикистана'}
                            value={isForeigner}
                            onChange={onForeigner}
                        />
                        {isForeigner ? (
                            <button className={classes.google} onClick={onGoogle}>
                                <Google width={24} height={24} />
                                {isGoogleAuth ? (
                                    <span className={classes.loader}></span>
                                ) : 'Вход'}
                            </button>
                        ) : null}
                    </div>
                ) : (
                    <div className={classes.loginContent}>
                        <button
                            className={classes.back}
                            onClick={onBack}
                        >
                            <Back width={20} height={20} />
                        </button>
                        <img
                            src={Logo}
                            alt="Brand"
                            className={classes.loginBrand}
                        />
                        <h1 className={classes.loginTitle}>Введите номер из СМС</h1>
                        <p className={classes.loginDescription}>
                            Код отправлен на номер телефона {phone}
                        </p>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                            renderInput={(props) => {
                                return (
                                    <input {...props} className={className(classes.otpInput, undefined, [props.className ?? ''])} />
                                )
                            }}
                        />
                        {otpErrors ? (
                            <div className={classes.errors}>
                                {otpErrors && Object.keys(otpErrors).map((key: string) => {
                                    return (
                                        <div key={key}>
                                            {otpErrors[key].map((message: string) => {
                                                return (
                                                    <p
                                                        key={message}
                                                        className={classes.error}
                                                    >
                                                        {message}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null}
                        {time ? (
                            <p className={classes.resendDescription}>Отправить код повторно можно через {time} сек.</p>
                        ) : null}
                        {canResend ? (
                            <button
                                className={classes.resend}
                                onClick={onLoginResendOTP}
                            >
                                {isSendingEmail ? (
                                    <span className={classes.loader} style={{borderColor: '#fff', borderBottomColor: 'transparent'}}></span>
                                ) : 'Отправить код повторно'}
                            </button>
                        ) : null}
                        <button
                            className={classes.continueBtn}
                            onClick={onLoginSend}
                            disabled={otp.length < 6}
                        >
                            {isCheckingOtp ? (
                                <span className={classes.loader}></span>
                            ) : 'Отправить'}
                        </button>
                        <p className={classes.privacyPolicy}>
                            Если нужна помощь, пиши нам
                            на help@premier.rj
                        </p>
                    </div>
                )}
            </NativeModal>
            <NativeModal
                value={showRegister}
                onChange={onRegisterModal}
            >
                {!sent ? (
                    <div className={classes.loginContent}>
                        <img
                            src={Logo}
                            alt="Brand"
                            className={classes.loginBrand}
                        />
                        <h1 className={classes.loginTitle}>Зарегистрироваться</h1>
                        <div className={classes.field}>
                            <input
                                type="text"
                                className={classes.fieldInput}
                                placeholder={"Телефон"}
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <input
                                type="text"
                                className={classes.fieldInput}
                                placeholder={"Имя"}
                                value={firstname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className={classes.field}>
                            <input
                                type="text"
                                className={classes.fieldInput}
                                placeholder={"Фамилия"}
                                value={lastname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
                            />
                        </div>
                        <button
                            className={classes.continueBtn}
                            onClick={onRegisterContinue}
                            disabled={!phone.length || !firstname.length || !lastname.length}
                        >
                            {isSendingEmail ? (
                                <span className={classes.loader}></span>
                            ) : 'Продолжить'}
                        </button>
                        <p className={classes.privacyPolicy}>
                            Нажимая «Продолжить», я принимаю условия <span className={classes.privacyPolicyLink}>Пользовательского соглашения</span> ООО «ПРЕМЬЕР»
                        </p>
                    </div>
                ) : (
                    <div className={classes.loginContent}>
                        <button
                            className={classes.back}
                            onClick={onBack}
                        >
                            <Back width={20} height={20} />
                        </button>
                        <img
                            src={Logo}
                            alt="Brand"
                            className={classes.loginBrand}
                        />
                        <h1 className={classes.loginTitle}>Введите номер из СМС</h1>
                        <p className={classes.loginDescription}>
                            Код отправлен на номер телефона {phone}
                        </p>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                            renderInput={(props) => {
                                return (
                                    <input {...props} className={className(classes.otpInput, undefined, [props.className ?? ''])} />
                                )
                            }}
                        />
                        {otpErrors ? (
                            <div className={classes.errors}>
                                {otpErrors && Object.keys(otpErrors).map((key: string) => {
                                    return (
                                        <div key={key}>
                                            {otpErrors[key].map((message: string) => {
                                                return (
                                                    <p
                                                        key={message}
                                                        className={classes.error}
                                                    >
                                                        {message}
                                                    </p>
                                                )
                                            })}
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null}
                        {time ? (
                            <p className={classes.resendDescription}>Отправить код повторно можно через {time} сек.</p>
                        ) : null}
                        {canResend ? (
                            <button
                                className={classes.resend}
                                onClick={onRegisterResendOTP}
                            >
                                {isSendingEmail ? (
                                    <span className={classes.loader} style={{borderColor: '#fff', borderBottomColor: 'transparent'}}></span>
                                ) : 'Отправить код повторно'}
                            </button>
                        ) : null}
                        <button
                            className={classes.continueBtn}
                            onClick={onRegisterSend}
                            disabled={otp.length < 6}
                        >
                            {isCheckingOtp ? (
                                <span className={classes.loader}></span>
                            ) : 'Отправить'}
                        </button>
                        <p className={classes.privacyPolicy}>
                            Если нужна помощь, пиши нам
                            на help@premier.rj
                        </p>
                    </div>
                )}
            </NativeModal>
            <div className={classes.navbarWrapper}>
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
                        value={showMenu}
                        onChange={(value: boolean) => setShowMenu(value)}
                        className={classes.categoriesModal}
                    >
                        <div className={classes.categoriesMenu}>
                            <div className={classes.categories}>
                                {navigations.map(nav => (
                                    <div
                                        onMouseEnter={() => onNavItem(nav.value)}
                                        key={nav.value}
                                        className={classes.category}
                                        onClick={() => onNavItemPage(nav.value)}
                                    >
                                        {nav.label}
                                    </div>
                                ))}
                            </div>
                            <div className={classes.categories}>
                                {subItems.map(child => (
                                    <div
                                        key={`${navItem}${child.value}`}
                                        className={classes.category}
                                        onClick={() => onSubNavItemPage(child)}
                                    >
                                        {child.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ModalNav>
                </div>
                <SearchInput
                    onChange={(value) => onSearchPage()}
                    placeholder={'Фильм, сериал'}
                    style={{
                        'width': '473px',
                        'height': '40px',
                        'marginLeft': '60px',
                    }}
                    className={classes.searchInput}
                />
                <ul className={classes.navItems}>
                    <li className={className(classes.navItem, null, [classes.additionalSearchInput])} onClick={onSearch}>
                        <Search width={30} height={30} />
                    </li>
                    <li className={className(classes.navItem, null, [classes.home])} onClick={onHome}>
                        <Home width={24} height={24} />
                        Главная
                    </li>
                    <li className={className(classes.navItem, null, [classes.free])} onClick={onFree}>
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
                {authData ? (
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
                                        {authData.firstname + " " + (authData.lastname ?? '')} {authData.phone ? `(${authData.phone})` : null}
                                    </div>
                                    <ul className={classes.profileItems}>
                                        <div className={classes.profileItem} onClick={onProfile}>
                                            <Settings width={24} height={24} />
                                            Настройки профиля
                                        </div>
                                        {/*<div className={classes.profileItem}>*/}
                                        {/*    <Favourites width={24} height={24} />*/}
                                        {/*    Избранное*/}
                                        {/*</div>*/}
                                        {/*<div className={classes.profileItem}>*/}
                                        {/*    <Play width={24} height={24} />*/}
                                        {/*    Мои подписки*/}
                                        {/*</div>*/}
                                        {/*<div className={classes.profileItem}>*/}
                                        {/*    <PaymentType width={24} height={24} />*/}
                                        {/*    Способы оплата*/}
                                        {/*</div>*/}
                                        <div
                                            className={classes.profileItem}
                                            onClick={logoutSimpleUser}
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
                ) : (
                    <button
                        onClick={onLogin}
                        className={classes.login}
                    >
                        Войти
                    </button>
                )}
            </div>
            <SearchInput
                onChange={(value) => onSearchPage()}
                placeholder={'Фильм, сериал'}
                className={classes.bottomSearchInput}
            />
        </div>
    )
}

export default AppNavbar
