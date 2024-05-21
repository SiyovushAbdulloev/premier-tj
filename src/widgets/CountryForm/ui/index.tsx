import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {Country, getIsStoring, getStoreErrors, storeCountry} from "src/entities/Country";
import {TextField} from "src/shared/ui/TextField";
import React, {useRef} from "react";
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
    const name = useRef<string>(props.data ? props.data.name : '')
    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const errors = useSelector(getStoreErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data  = await dispatch(storeCountry(name.current))
        if (data.type.includes('fulfilled')) {
            navigate(RoutesConfig.admin_countries.path)
        }
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_countries.path)
    }

    return (
        <form
            className={classes.countryForm}
            onSubmit={onSubmit}
        >
            <TextField
                ref={name}
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
            <div className={classes.actions}>
                <button
                    className={classes.formAction}
                    onClick={goBack}
                >
                    Назад
                </button>
                <button className={classes.formAction}>
                    {isStoring ? <Loading width={24} height={24} /> : props.type === FormType.CREATE ? 'Создать' : 'Изменить'}
                </button>
            </div>
        </form>
    )
}

export default CountryForm
