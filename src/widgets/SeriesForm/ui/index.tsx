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
    getStoreErrors, getUpdateErrors,
    Series, seriesActions,
    storeSeries,
    updateSeries
} from "src/entities/Series";

interface Props {
    type: FormType
    data?: Series
}
const SeriesForm = (props: Props) => {
    const [name, setName] = useState<string>(props.data ? props.data.name : '')
    const [genreIds, setGenreIds] = useState<Array<number>>(props.data ? props.data.genre_ids : [])
    const [actorIds, setActorIds] = useState<Array<number>>(props.data ? props.data.actor_ids : [])
    const [countryIds, setCountryIds] = useState<Array<number>>(props.data ? props.data.country_ids : [])
    const [description, setDescription] = useState<string>(props.data ? props.data.description : '')
    const [isPublished, setIsPublished] = useState<number>(props.data ? props.data.is_published : 0)
    const [trailerUrl, setTrailerUrl] = useState<string>(props.data ? props.data.trailer : '')
    const [posterUrl, setPosterUrl] = useState<string>(props.data ? props.data.poster : '')
    const [releasedAt, setReleasedAt] = useState<string>(props.data ? props.data.released_at : '')
    const trailerRef = useRef<File | undefined>(undefined)
    const posterRef = useRef<File | undefined>(undefined)

    const [genres, setGenres] = useState<Array<Genre>>([])
    const [actors, setActors] = useState<Array<Actor>>([])
    const [countries, setCountries] = useState<Array<Country>>([])

    const dispatch = useAppDispatch()
    const isFetchingAllGenres = useSelector(getIsFetchingAllGenres)
    const isFetchingAllCountries = useSelector(getIsFetchingAllCountries)
    const isFetchingAllActors = useSelector(getIsFetchingAllActors)
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
        actorIds.forEach(id => {
            content.append('actor_ids[]', `${id}`)
        })
        countryIds.forEach(id => {
            content.append('country_ids[]', `${id}`)
        })
        content.append('description', description)
        if (trailerRef.current) {
            content.append('trailer', trailerRef.current)
        }
        if (posterRef.current) {
            content.append('poster', posterRef.current)
        }
        content.append('released_at', releasedAt)
        content.append('is_published', `${isPublished}`)
        if (props.type === FormType.CREATE) {
            response  = await dispatch(storeSeries({
                data: content
            }))
        } else {
            content.append('_method', 'PUT')
            response  = await dispatch(updateSeries({
                id: props.data?.id,
                data: content
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(seriesActions.setStoreErrors(undefined))
            } else {
                dispatch(seriesActions.setUpdateErrors(undefined))
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

    const onCountry = (option: SelectedOption) => {
        let data = [...countryIds]

        if (data.includes(option.value)) {
            data = data.filter((item) => item !== option.value)
        } else {
            data.push(option.value)
        }

        setCountryIds(data)
    }

    const onRemoveCountry = (value: any) => {
        let data = [...countryIds]

        if (data.includes(value)) {
            data = data.filter((item) => item !== value)
        }

        setCountryIds(data)
    }

    const onDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const onPublish = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublished(isPublished === 1 ? 0 : 1)
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_series.path)
    }

    useEffect(() => {
        if (props.data) {
            setName(props.data.name)
            setGenreIds(props.data.genre_ids)
            setActorIds(props.data.actor_ids)
            setCountryIds(props.data.country_ids)
            setDescription(props.data.description)
            setIsPublished(props.data.is_published)
            setReleasedAt(props.data.released_at)
            setTrailerUrl(props.data.trailer)
            setPosterUrl(props.data.poster)
        }
    }, [props.data])

    useEffect(() => {
        const fetchData = async () => {
            const genresData = await dispatch(getAllGenres())
            if (genresData.type.includes('fulfilled')) {
                setGenres(genresData.payload.data)
            }
            const countriesData = await dispatch(getAllCountries())
            if (countriesData.type.includes('fulfilled')) {
                setCountries(countriesData.payload.data)
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
                        <SearchableMultipleSelect
                            height={countries.length > 5 ? 250 : null}
                            style={{'width': '50%'}}
                            onSelect={onCountry}
                            onRemove={onRemoveCountry}
                            value={countryIds}
                            placeholder={'Выберите страны'}
                            loading={isFetchingAllCountries}
                        >
                            {countries.length && countries.map(country => {
                                return (
                                    <Option
                                        key={country.id}
                                        label={country.name}
                                        value={country.id}
                                    />
                                )
                            })}
                        </SearchableMultipleSelect>
                        <SearchableMultipleSelect
                            height={genres.length > 5 ? 250 : null}
                            style={{'width': '50%'}}
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
                                ref={trailerRef}
                                placeholder={'Загрузите файл трейлера...'}
                                sizeLimit={1000000}
                                extensions={['video/mp4']}
                            />
                        </div>
                        <div className={classes.file}>
                            <Upload
                                ref={posterRef}
                                placeholder={'Загрузите файл постера...'}
                                sizeLimit={1000000}
                                extensions={['image/png', 'image/jpg', 'image/jpeg']}
                            />
                        </div>
                    </div>
                    <div className={classes.group}>
                        {trailerUrl.length ? (
                                <video
                                    src={trailerUrl}
                                    controls
                                    className={classes.fileUrl}
                                />
                        ) : null}
                        {posterUrl.length ? (
                                <img
                                    src={posterUrl}
                                    className={classes.fileUrl}
                                    alt={posterUrl}
                                />
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

export default SeriesForm
