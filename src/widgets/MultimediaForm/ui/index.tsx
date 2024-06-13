import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg";
import {
    getIsFetchingOne,
    getIsStoring,
    getIsUpdating,
    getStoreErrors,
    getUpdateErrors,
    MediaContent, mediaContentActions, storeMediaContent, updateMediaContent
} from "src/entities/MediaContent";
import {Option, SearchableMultipleSelect} from "src/shared/ui/SearchableMultipleSelect";
import {Genre, getAllGenres, getIsFetchingAll as getIsFetchingAllGenres} from "src/entities/Genre";
import {Actor, getAllActors, getIsFetchingAll as getIsFetchingAllActors} from "src/entities/Actor";
import {
    getAllSubscriptions,
    getIsFetchingAll as getIsFetchingAllSubscriptions,
    Subscription
} from "src/entities/Subscription";
import {SelectedOption} from "src/shared/ui/SearchableMultipleSelect/ui";
import {Upload} from "src/shared/ui/Upload";
import {className} from "src/shared/utils/className";

interface Props {
    type: FormType
    data?: MediaContent
}
const MultimediaForm = (props: Props) => {
    const [name, setName] = useState<string>(props.data ? props.data.name : '')
    const [genreIds, setGenreIds] = useState<Array<number>>(props.data ? props.data.genre_ids : [])
    const [subscriptionIds, setSubscriptionIds] = useState<Array<number>>(props.data ? props.data.subscription_ids : [])
    const [actorIds, setActorIds] = useState<Array<number>>(props.data ? props.data.actor_ids : [])
    const [duration, setDuration] = useState<string>(props.data ? props.data.duration : '')
    const [description, setDescription] = useState<string>(props.data ? props.data.description : '')
    const [isPublished, setIsPublished] = useState<number>(props.data ? props.data.is_published : 0)
    const [fileUrl, setFileUrl] = useState<string>(props.data ? props.data.file : '')
    const [releasedAt, setReleasedAt] = useState<string>(props.data ? props.data.released_at : '')
    const fileRef = useRef<File | undefined>(undefined)

    const [genres, setGenres] = useState<Array<Genre>>([])
    const [subscriptions, setSubscriptions] = useState<Array<Subscription>>([])
    const [actors, setActors] = useState<Array<Actor>>([])

    const dispatch = useAppDispatch()
    const isFetchingAllGenres = useSelector(getIsFetchingAllGenres)
    const isFetchingAllActors = useSelector(getIsFetchingAllActors)
    const isFetchingAllSubscriptions = useSelector(getIsFetchingAllSubscriptions)
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let response
        const content = new FormData()
        content.append('name', name)
        genreIds.forEach(id => {
            content.append('genre_ids[]', `${id}`)
        })
        subscriptionIds.forEach(id => {
            content.append('subscription_ids[]', `${id}`)
        })
        actorIds.forEach(id => {
            content.append('actor_ids[]', `${id}`)
        })
        content.append('duration', duration)
        content.append('description', description)
        if (fileRef.current) {
            content.append('file', fileRef.current)
        }
        content.append('released_at', releasedAt)
        content.append('type', '1')
        content.append('is_published', `${isPublished}`)
        if (props.type === FormType.CREATE) {
            response  = await dispatch(storeMediaContent({
                data: content
            }))
        } else {
            content.append('_method', 'PUT')
            response  = await dispatch(updateMediaContent({
                id: props.data?.id,
                data: content
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(mediaContentActions.setStoreErrors(undefined))
            } else {
                dispatch(mediaContentActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const onGenre = (option: SelectedOption) => {
        let data = [...genreIds]

        if (data.includes(option.value)) {
            data = data.filter((item) => item !== option.value)
        } else {
            data.push(option.value)
        }

        setGenreIds(data)
    }

    const onRemoveGenre = (value: any) => {
        let data = [...genreIds]

        if (data.includes(value)) {
            data = data.filter((item) => item !== value)
        }

        setGenreIds(data)
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

    const onActor = (option: SelectedOption) => {
        let data = [...actorIds]

        if (data.includes(option.value)) {
            data = data.filter((item) => item !== option.value)
        } else {
            data.push(option.value)
        }

        setActorIds(data)
    }

    const onRemoveActor = (value: any) => {
        let data = [...actorIds]

        if (data.includes(value)) {
            data = data.filter((item) => item !== value)
        }

        setActorIds(data)
    }

    const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const onPublish = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublished(isPublished === 1 ? 0 : 1)
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_multimedias.path)
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name)
            setGenreIds(props.data.genre_ids)
            setSubscriptionIds(props.data.subscription_ids)
            setActorIds(props.data.actor_ids)
            setDuration(props.data.duration)
            setDescription(props.data.description)
            setIsPublished(props.data.is_published)
            setReleasedAt(props.data.released_at)
            setFileUrl(props.data.file)
        }
    }, [props.data])

    useEffect(() => {
        const fetchData = async () => {
            const genresData = await dispatch(getAllGenres())
            if (genresData.type.includes('fulfilled')) {
                setGenres(genresData.payload.data)
            }
            const subscriptionsData = await dispatch(getAllSubscriptions())
            if (subscriptionsData.type.includes('fulfilled')) {
                setSubscriptions(subscriptionsData.payload.data)
            }
            const actorsData = await dispatch(getAllActors())
            if (actorsData.type.includes('fulfilled')) {
                setActors(actorsData.payload.data)
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
                            id={'name'}
                            onChange={(value: string) => setName(value)}
                            value={name}
                            label={'Имя'}
                            placeholder={'Новости'}
                        />
                        <SearchableMultipleSelect
                            height={genres.length > 5 ? 250 : null}
                            style={{'width': '30%'}}
                            onSelect={onGenre}
                            onRemove={onRemoveGenre}
                            value={genreIds}
                            placeholder={'Выберите жанры'}
                            loading={isFetchingAllGenres}
                        >
                            {genres.length && genres.map(genre => {
                                return (
                                    <Option
                                        key={genre.id}
                                        label={genre.name}
                                        value={genre.id}
                                    />
                                )
                            })}
                        </SearchableMultipleSelect>
                    </div>
                    <div className={className(classes.group, {}, [classes.end])}>
                        <TextField
                            style={{'width': '30%'}}
                            id={'duration'}
                            onChange={(value: string) => setDuration(value)}
                            value={duration}
                            label={'Длительность'}
                            placeholder={'02:30'}
                        />
                        <SearchableMultipleSelect
                            height={genres.length > 5 ? 250 : null}
                            style={{'width': '30%'}}
                            onSelect={onSubscription}
                            onRemove={onRemoveSubscription}
                            value={subscriptionIds}
                            placeholder={'Выберите подписки'}
                            loading={isFetchingAllSubscriptions}
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
                        <SearchableMultipleSelect
                            height={genres.length > 5 ? 250 : null}
                            style={{'width': '30%'}}
                            onSelect={onActor}
                            onRemove={onRemoveActor}
                            value={actorIds}
                            placeholder={'Выберите актеров'}
                            loading={isFetchingAllActors}
                        >
                            {actors.length && actors.map(actor => {
                                return (
                                    <Option
                                        key={actor.id}
                                        label={`${actor.first_name} ${actor.last_name}`}
                                        value={actor.id}
                                    />
                                )
                            })}
                        </SearchableMultipleSelect>
                    </div>
                    <div className={classes.group}>
                        <textarea
                            cols={40}
                            rows={10}
                            placeholder={'Описание stand up...'}
                            value={description}
                            onChange={onDescription}
                            className={classes.description}
                        ></textarea>
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
                        <TextField
                            style={{'width': '40%'}}
                            id={'released_at'}
                            onChange={(value: string) => setReleasedAt(value)}
                            value={releasedAt}
                            label={'Дата релиза'}
                            placeholder={'Формат:18/12/2019'}
                        />
                    </div>
                    <div className={classes.group}>
                        <div className={classes.file}>
                            <Upload
                                ref={fileRef}
                                placeholder={'Загрузите файл stand up...'}
                                sizeLimit={1000000}
                                extensions={['video/mp4']}
                            />
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

export default MultimediaForm
