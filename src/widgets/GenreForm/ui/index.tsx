import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {
    Genre, genreActions,
    getIsStoring,
    getIsUpdating,
    getStoreErrors,
    getUpdateErrors,
    storeGenre,
    updateGenre
} from "src/entities/Genre";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";

interface Props {
    type: FormType
    data?: Genre
}
const GenreForm = (props: Props) => {
    const [name, setName] = useState<string>(props.data ? props.data.name : '')
    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data

        if (props.type === FormType.CREATE) {
            data  = await dispatch(storeGenre(name))
        } else {
            //@ts-ignore
            data  = await dispatch(updateGenre({name, id: props.data.id}))
        }

        if (data.type.includes('fulfilled')) {
            dispatch(genreActions.setStoreErors(undefined))
            dispatch(genreActions.setUpdateErors(undefined))
            goBack()
        }
    }

    const onName = (value: string) => {
        setName(value)
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_genres.path)
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name)
        }
    }, [props.data])

    return (
        <form
            className={classes.genreForm}
            onSubmit={onSubmit}
        >
            <TextField
                onChange={onName}
                value={name}
                id={'name'}
                placeholder={'Комедия'}
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

export default GenreForm
