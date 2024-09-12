import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg";
import {
    getIsFetchingOne,
    getIsStoring, getIsUpdating,
    getStoreErrors, getUpdateErrors,
    storeSubscription,
    Subscription,
    subscriptionActions,
    updateSubscription
} from "src/entities/Subscription";

interface Props {
    type: FormType
    data?: Subscription
}
const SubscriptionForm = (props: Props) => {
    const [name, setName] = useState<string>(props.data ? props.data.name : '')
    const [description, setDescription] = useState<string>(props.data ? props.data.description : '')
    const [price, setPrice] = useState<string>(props.data ? `${props.data.price}` : '')
    const [duration, setDuration] = useState<string>(props.data ? `${props.data.duration}` : '')
    const [promotionalPrice, setPromotionalPrice] = useState<string>(props.data ? `${props.data.promotional_price ?? ''}` : '')
    const [promotionalDuration, setPromotionalDuration] = useState<string>(props.data ? `${props.data.promotional_duration ?? ''}` : '')
    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data

        if (props.type === FormType.CREATE) {
            data  = await dispatch(storeSubscription({
                name,
                description,
                price,
                duration,
                promotional_price: promotionalPrice,
                promotional_duration: promotionalDuration
            }))
        } else {
            data  = await dispatch(updateSubscription({
                // @ts-ignore
                id: props.data.id,
                name,
                description,
                price,
                duration,
                promotional_price: promotionalPrice,
                promotional_duration: promotionalDuration
            }))
        }

        if (data.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(subscriptionActions.setStoreErrors(undefined))
            } else {
                dispatch(subscriptionActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const onName = (value: string) => {
        setName(value)
    }

    const onDescription = (value: string) => {
        setDescription(value)
    }

    const onPrice = (value: string) => {
        setPrice(value)
    }

    const onDuration = (value: string) => {
        setDuration(value)
    }

    const onPromotionalPrice = (value: string) => {
        setPromotionalPrice(value)
    }

    const onPromotionalDuration = (value: string) => {
        setPromotionalDuration(value)
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name)
            setDescription(props.data.description)
            setPrice(`${props.data.price}`)
            setDuration(`${props.data.duration}`)
            setPromotionalPrice(`${props.data.promotional_price}`)
            setPromotionalDuration(`${props.data.promotional_duration}`)
        }
    }, [props.data])

    return (
        <form
            className={classes.countryForm}
            onSubmit={onSubmit}
        >
            {isFetchingOne ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <TextField
                        onChange={onName}
                        value={name}
                        id={'name'}
                        placeholder={'Супер подписка'}
                        label={'Наименование'}
                    />
                    <TextField
                        onChange={onDescription}
                        value={description}
                        id={'description'}
                        placeholder={'Некоторое описание'}
                        label={'Описание'}
                    />
                    <div className={classes.group}>
                        <TextField
                            style={{'width': '50%'}}
                            onChange={onPrice}
                            value={price}
                            id={'price'}
                            placeholder={'120'}
                            label={'Цена'}
                        />
                        <TextField
                            style={{'width': '50%'}}
                            onChange={onDuration}
                            value={duration}
                            id={'duration'}
                            placeholder={'30'}
                            label={'Длительность(в днях)'}
                        />
                    </div>
                    <div className={classes.group}>
                        <TextField
                            style={{'width': '50%'}}
                            onChange={onPromotionalPrice}
                            value={promotionalPrice}
                            id={'promotional_price'}
                            placeholder={'100'}
                            label={'Цена(скидка)'}
                        />
                        <TextField
                            style={{'width': '50%'}}
                            onChange={onPromotionalDuration}
                            value={promotionalDuration}
                            id={'promotional_duration'}
                            placeholder={'30'}
                            label={'Длительность(скидка)'}
                        />
                    </div>
                    {errors && Object.keys(errors).map((key: string) => {
                        return (
                            <div key={key}>
                                {errors[key].map((message: string) => {
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
                    <div className={classes.actions}>
                        <button
                            className={classes.formAction}
                            onClick={goBack}
                        >
                            Назад
                        </button>
                        <button className={classes.formAction}>
                            {(isStoring || isUpdating) ? <Loading width={24} height={24} /> : props.type === FormType.CREATE ? 'Создать' : 'Изменить'}
                        </button>
                    </div>
                </>
            )}
        </form>
    )
}

export default SubscriptionForm
