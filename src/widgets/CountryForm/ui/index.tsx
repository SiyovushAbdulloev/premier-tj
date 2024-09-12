import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {
    Country,
    countryActions,
    getIsStoring,
    getIsUpdating,
    getStoreErrors, getUpdateErrors,
    storeCountry,
    updateCountry
} from "src/entities/Country";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";

interface Props {
    type: FormType
    data?: Country
}
const CountryForm = (props: Props) => {
    const [name, setName] = useState<string>(props.data ? props.data.name : '')
    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const errors = useSelector(getStoreErrors)
    const isUpdating = useSelector(getIsUpdating)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data

        if (props.type === FormType.CREATE) {
            data  = await dispatch(storeCountry(name))
        } else {
            //@ts-ignore
            data  = await dispatch(updateCountry({name, id: props.data.id}))
        }

        if (data.type.includes('fulfilled')) {
            dispatch(countryActions.setStoreErors(undefined))
            dispatch(countryActions.setUpdateErors(undefined))
            goBack()
        }
    }

    const onName = (value: string) => {
        setName(value)
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name)
        }
    }, [props.data])

    return (
        <form
            className={classes.countryForm}
            onSubmit={onSubmit}
        >
            <TextField
                onChange={onName}
                value={name}
                id={'name'}
                placeholder={'Таджикистан'}
                label={'Наименование'}
            />
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
        </form>
    )
}

export default CountryForm
