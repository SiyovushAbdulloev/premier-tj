import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg";
import {className} from "src/shared/utils/className";
import {
    getIsFetchingOne,
    getIsUpdating,
    getUpdateErrors,
    SocialLink,
    socialLinkActions,
    updateLink
} from "src/entities/SocialLink";

interface Props {
    type: FormType
    data?: SocialLink
}
const SocialLinkForm = (props: Props) => {
    const [path, setPath] = useState<string>(props.data ? props.data.path ?? '' : '')
    const [label, setLabel] = useState<string>(props.data ? props.data.label : '')

    const dispatch = useAppDispatch()
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await dispatch(updateLink({
            path: path,
            label: label,
            name: props.data?.name ?? ''
        }))

        if (response.type.includes('fulfilled')) {
            dispatch(socialLinkActions.setUpdateErrors(undefined))
            goBack()
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setLabel(props.data.label)
            setPath(props.data.path ?? '')
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
                    <div className={className(classes.group, {}, [classes.end])}>
                        <TextField
                            style={{'width': '65%'}}
                            id={'path'}
                            onChange={(value: string) => setPath(value)}
                            value={path}
                            label={'Ссылка'}
                            placeholder={'https://t.me...'}
                        />
                        <TextField
                            style={{'width': '65%'}}
                            id={'label'}
                            onChange={(value: string) => setLabel(value)}
                            value={label}
                            label={'Наименование'}
                            placeholder={'Google play...'}
                        />
                    </div>
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
                            type={'button'}
                        >
                            Назад
                        </button>
                        <button className={classes.formAction}>
                            {isUpdating ? <Loading width={24} height={24} /> : 'Изменить'}
                        </button>
                    </div>
                </>
            )}
        </form>
    )
}

export default SocialLinkForm
