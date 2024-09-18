import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg";
import {Upload} from "src/shared/ui/Upload";
import {className} from "src/shared/utils/className";
import {
    getIsFetchingOne,
    getIsStoring,
    getIsUpdating,
    getStoreErrors,
    getUpdateErrors,
    SerieSeason, serieSeasonActions, storeSerieSeason, updateSerieSeason
} from "src/entities/SerieSeason";

interface Props {
    type: FormType
    data?: SerieSeason
}
const SerieSeasonForm = (props: Props) => {
    const [number, setNumber] = useState<string>(props.data ? props.data.number + '' : '')
    const [description, setDescription] = useState<string>(props.data ? props.data.description : '')
    const [isPublished, setIsPublished] = useState<number>(props.data ? props.data.is_published : 0)
    const [trailerUrl, setTrailerUrl] = useState<string>(props.data ? props.data.trailer : '')
    const trailerRef = useRef<File | undefined>(undefined)

    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()
    const {slug} = useParams()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let response
        const content = new FormData()
        content.append('number', number)
        content.append('description', description)
        if (trailerRef.current) {
            content.append('trailer', trailerRef.current)
        }
        content.append('is_published', `${isPublished}`)
        if (props.type === FormType.CREATE) {
            response  = await dispatch(storeSerieSeason({
                data: content,
                serie: slug ?? ''
            }))
        } else {
            content.append('_method', 'PUT')
            response  = await dispatch(updateSerieSeason({
                id: props.data?.id ?? 0,
                data: content,
                serie: slug ?? ''
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(serieSeasonActions.setStoreErrors(undefined))
            } else {
                dispatch(serieSeasonActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const onPublish = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublished(isPublished === 1 ? 0 : 1)
    }

    const goBack = () => {
        console.log("BACK")
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setNumber(props.data.number + '')
            setDescription(props.data.description)
            setIsPublished(props.data.is_published)
            setTrailerUrl(props.data.trailer)
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
                            style={{'width': '35%'}}
                            id={'number'}
                            onChange={(value: string) => setNumber(value)}
                            value={number}
                            label={'Число'}
                            placeholder={'1'}
                        />
                        <div className={classes.publish}>
                            <input
                                className={classes.publishInput}
                                type="checkbox"
                                value={isPublished}
                                onChange={onPublish}
                                id={'published'}
                                checked={!!isPublished}
                            />
                            <label htmlFor="published">Опубликовать</label>
                        </div>
                    </div>
                    <div className={classes.group}>
                        <textarea
                            cols={40}
                            rows={10}
                            placeholder={'Описание сезона...'}
                            value={description}
                            onChange={onDescription}
                            className={classes.description}
                        ></textarea>
                    </div>
                    <div className={classes.group}>
                        <div className={classes.file}>
                            <Upload
                                ref={trailerRef}
                                placeholder={'Загрузите файл трейлера...'}
                                sizeLimit={1000000}
                                extensions={['video/mp4']}
                            />
                        </div>
                    </div>
                    <div className={classes.group}>
                        {trailerUrl.length ? (
                            <video
                                src={trailerUrl}
                                controls
                                className={classes.fileUrl}
                            ></video>
                        ) : null}
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

export default SerieSeasonForm
