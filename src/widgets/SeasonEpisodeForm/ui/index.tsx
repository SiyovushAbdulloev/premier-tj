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
import {Option, SearchableMultipleSelect} from "src/shared/ui/SearchableMultipleSelect";
import {Genre, getAllGenres, getIsFetchingAll as getIsFetchingAllGenres} from "src/entities/Genre";
import {Country, getAllCountries, getIsFetchingAll as getIsFetchingAllCountries} from "src/entities/Country";
import {Actor, getAllActors, getIsFetchingAll as getIsFetchingAllActors} from "src/entities/Actor";
import {SelectedOption} from "src/shared/ui/SearchableMultipleSelect/ui";
import {Upload} from "src/shared/ui/Upload";
import {className} from "src/shared/utils/className";
import {
    getIsFetchingOne,
    getIsStoring,
    getIsUpdating,
    getStoreErrors,
    getUpdateErrors,
    SeasonEpisode, seasonEpisodeActions, storeSeasonEpisode, updateSeasonEpisode
} from "src/entities/SeasonEpisode";
import {getAllSubscriptions, Subscription} from "src/entities/Subscription";

interface Props {
    type: FormType
    data?: SeasonEpisode
}
const SeasonEpisodeForm = (props: Props) => {
    const [number, setNumber] = useState<string>(props.data ? props.data.number + '' : '')
    const [duration, setDuration] = useState<string>(props.data ? props.data.duration : '')
    const [subscriptionIds, setSubscriptionIds] = useState<Array<number>>(props.data ? props.data.subscription_ids : [])
    const [description, setDescription] = useState<string>(props.data ? props.data.description : '')
    const [isPublished, setIsPublished] = useState<number>(props.data ? props.data.is_published : 0)
    const [fileUrl, setFileUrl] = useState<string>(props.data ? props.data.file : '')
    const fileRef = useRef<File | undefined>(undefined)

    const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([])

    const dispatch = useAppDispatch()
    const isFetchingAllGenres = useSelector(getIsFetchingAllGenres)
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()
    const {id, seasonId} = useParams()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let response
        const content = new FormData()
        content.append('number', number)
        subscriptionIds.forEach(id => {
            content.append('subscription_ids[]', `${id}`)
        })
        content.append('description', description)
        content.append('duration', duration)
        if (fileRef.current) {
            content.append('file', fileRef.current)
        }
        content.append('is_published', `${isPublished}`)
        if (props.type === FormType.CREATE) {
            response  = await dispatch(storeSeasonEpisode({
                data: content,
                serie: parseInt(id ?? '0'),
                serie_season: parseInt(seasonId ?? '0')
            }))
        } else {
            content.append('_method', 'PUT')
            response  = await dispatch(updateSeasonEpisode({
                id: props.data?.id ?? 0,
                data: content,
                serie: parseInt(id ?? '0'),
                serie_season: parseInt(seasonId ?? '0')
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(seasonEpisodeActions.setStoreErrors(undefined))
            } else {
                dispatch(seasonEpisodeActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const onSubscription = (option: SelectedOption) => {
        let data = [...subscriptionIds]

        if (data.includes(option.value)) {
            data = data.filter((item) => item !== option.value)
        } else {
            data.push(option.value)
        }

        setSubscriptionIds(data)
    }

    const onRemoveSubscription = (value: any) => {
        let data = [...subscriptionIds]

        if (data.includes(value)) {
            data = data.filter((item) => item !== value)
        }

        setSubscriptionIds(data)
    }

    const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const onPublish = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublished(isPublished === 1 ? 0 : 1)
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_serie_season_episodes.path.replace(':id', id ?? '0').replace(':seasonId', seasonId ?? '0'))
    }

    useEffect(() => {
        if (props.data) {
            setNumber(props.data.number + '')
            setDuration(props.data.duration)
            setSubscriptionIds(props.data.subscription_ids)
            setDescription(props.data.description)
            setIsPublished(props.data.is_published)
            setFileUrl(props.data.file)
        }
    }, [props.data])

    useEffect(() => {
        const fetchData = async () => {
            const subscriptionsData = await dispatch(getAllSubscriptions())
            if (subscriptionsData.type.includes('fulfilled')) {
                setSubscriptions(subscriptionsData.payload.data)
            }
        }
        fetchData()
    }, [])

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
                            id={'number'}
                            onChange={(value: string) => setNumber(value)}
                            value={number}
                            label={'Номер серии'}
                            placeholder={'1'}
                        />
                        <TextField
                            style={{'width': '65%'}}
                            id={'duration'}
                            onChange={(value: string) => setDuration(value)}
                            value={duration}
                            label={'Длительность серии'}
                            placeholder={'1'}
                        />
                        <SearchableMultipleSelect
                            height={subscriptions.length > 5 ? 250 : null}
                            style={{'width': '30%'}}
                            onSelect={onSubscription}
                            onRemove={onRemoveSubscription}
                            value={subscriptionIds}
                            placeholder={'Выберите подписки'}
                            loading={isFetchingAllGenres}
                        >
                            {subscriptions.length && subscriptions.map(subscription => {
                                return (
                                    <Option
                                        key={subscription.id}
                                        label={subscription.name}
                                        value={subscription.id}
                                    />
                                )
                            })}
                        </SearchableMultipleSelect>
                    </div>
                    <div className={classes.group}>
                        <textarea
                            cols={40}
                            rows={10}
                            placeholder={'Описание серии...'}
                            value={description}
                            onChange={onDescription}
                            className={classes.description}
                        ></textarea>
                        <div className={classes.file}>
                            <Upload
                                ref={fileRef}
                                placeholder={'Загрузите файл серии...'}
                                sizeLimit={10000000}
                                extensions={['video/mp4']}
                            />
                        </div>
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
                        {fileUrl.length ? (
                            <video
                                src={fileUrl}
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

export default SeasonEpisodeForm
