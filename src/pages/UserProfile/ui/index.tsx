import classes from './index.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import React, {FormEvent, useEffect, useMemo, useState} from "react";
import 'react-loading-skeleton/dist/skeleton.css'
import {className} from "src/shared/utils/className";
import {useSelector} from "react-redux";
import {getAuthUserData} from "src/entities/User";
import {getIsUpdatingProfile, getProfileErrors, updateProfile} from "src/entities/Auth";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import toast from "react-hot-toast";
import {getIsFetchingAll, getSubscriptionsForWeb, Subscription} from "src/entities/Subscription";
import {ReactComponent as Loader} from "src/shared/assets/icons/loading.svg"

interface Tab {
    label: string
    value: string
    content: any
}

const UserProfilePage = () => {
    const authData = useSelector(getAuthUserData)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const isUpdating = useSelector(getIsUpdatingProfile)
    const updateErrors = useSelector(getProfileErrors)
    const dispatch = useAppDispatch()
    const fetchingSubscriptions = useSelector(getIsFetchingAll)
    const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([])

    const onProfileChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await dispatch(updateProfile({firstname, lastname}))
        if (response.type.includes('fulfilled')) {
            toast.success(response.payload.message)
        }
    }

    const tabs: Array<Tab> = useMemo(() => {
        return [
            {
                label: 'Мои данные',
                value: 'my_data',
                content: () => {
                    return (
                        <form className={classes.form} onSubmit={onProfileChange}>
                            <input
                                type="text"
                                className={classes.fieldInput}
                                placeholder={"Имя"}
                                value={firstname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstname(e.target.value)}
                            />
                            <input
                                type="text"
                                className={classes.fieldInput}
                                placeholder={"Фамилия"}
                                value={lastname}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastname(e.target.value)}
                            />
                            <button className={classes.continueBtn}>
                                {isUpdating ? (
                                    <span className={classes.loader}></span>
                                ) : 'Обновить'}
                            </button>
                            {updateErrors ? (
                                <div className={classes.errors}>
                                    {updateErrors && Object.keys(updateErrors).map((key: string) => {
                                        return (
                                            <div key={key}>
                                                {updateErrors[key].map((message: string) => {
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
                        </form>
                    )
                }
            },
            {
                label: 'Мои подписки',
                value: 'my_subscriptions',
                content: () => {
                    return (
                        <div className={classes.subscriptions}>
                            {fetchingSubscriptions ? <Loader className={classes.subscriptionLoader} /> : (
                                subscriptions.map(subscription => {
                                    return (
                                        <div className={classes.subscription} key={subscription.id}>
                                            <div className={classes.left}>
                                                <span>Имя:{subscription.name}</span>
                                                <span>Описание:{subscription.description}</span>
                                                <span>Цена(сомони):{subscription.price}</span>
                                                <span>Длительность(день):{subscription.duration}</span>
                                            </div>
                                            <div className={classes.actions}>
                                                <button className={classes.buy}>Приобрести</button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    )
                }
            },
            {
                label: 'Избранное',
                value: 'favourite',
                content: () => {
                    return (
                        <></>
                    )
                }
            },
        ]
    }, [firstname, lastname, authData, isUpdating, updateErrors, fetchingSubscriptions, subscriptions])
    const [activeTab, setActiveTab] = useState<string>(tabs[0].value)

    const onTab = (tab: Tab) => {
        setActiveTab(tab.value)
    }

    useEffect(() => {
        const fetchSubscriptions = async () => {
            const response = await dispatch(getSubscriptionsForWeb())
            if (response.type.includes('fulfilled')) {
                console.log({response})
                setSubscriptions(response.payload)
            }
        }
        if (activeTab === 'my_subscriptions') {
            fetchSubscriptions()
        }
    }, [activeTab])

    useEffect(() => {
        setFirstname(authData?.firstname ?? '')
        setLastname(authData?.lastname ?? '')
    }, [])

    return (
        <div className={classes.profilePage}>
            <div className={classes.container}>
                <div className={classes.tabs}>
                    {tabs.map(tab => {
                        return (
                            <div
                                className={className(classes.tab, {[classes.active]: activeTab === tab.value})}
                                onClick={() => onTab(tab)}
                                key={tab.value}
                            >
                                {tab.label}
                            </div>
                        )
                    })}
                </div>
                <div className={classes.tabContent}>
                    {tabs.find(tab => tab.value === activeTab)?.content()}
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage
