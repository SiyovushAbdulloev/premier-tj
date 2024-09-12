import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {
    Actor, actorActions,
    getIsStoring,
    getIsUpdating,
    getStoreErrors,
    getUpdateErrors,
    storeActor,
    updateActor
} from "src/entities/Actor";
import {Upload} from "src/shared/ui/Upload";

interface Props {
    type: FormType
    data?: Actor
}
const ActorForm = (props: Props) => {
    const [firstName, setFirstName] = useState<string>(props.data ? props.data.first_name : '')
    const [lastName, setLastName] = useState<string>(props.data ? props.data.last_name : '')
    const fileRef = useRef()
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
            data  = await dispatch(storeActor({
                first_name: firstName,
                last_name: lastName,
                avatar: fileRef.current
            }))
        } else {
            //@ts-ignore
            if (props.data) {
                data  = await dispatch(updateActor({
                    id: props.data.id,
                    first_name: firstName,
                    last_name: lastName,
                    avatar: fileRef.current
                }))
            }
        }

        //@ts-ignore
        if (data.type.includes('fulfilled')) {
            dispatch(actorActions.setStoreErors(undefined))
            dispatch(actorActions.setUpdateErors(undefined))
            goBack()
        }
    }

    const onFirstName = (value: string) => {
        setFirstName(value)
    }

    const onLastName = (value: string) => {
        setLastName(value)
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setFirstName(props.data.first_name)
            setLastName(props.data.last_name)
        }
    }, [props.data])

    return (
        <form
            className={classes.actorForm}
            onSubmit={onSubmit}
        >
            <TextField
                onChange={onFirstName}
                value={firstName}
                id={'firstName'}
                placeholder={'Джон'}
                label={'Имя'}
            />
            <TextField
                onChange={onLastName}
                value={lastName}
                id={'lastName'}
                placeholder={'Джон'}
                label={'Фамилия'}
            />
            {props.data && (
                <img
                    className={classes.img}
                    src={props.data.avatar}
                    alt="Avatar"
                />
            )}
            <Upload
                sizeLimit={100}
                extensions={['image/png']}
                ref={fileRef}
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

export default ActorForm
