import classes from './index.module.css'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading.svg'
import {useNavigate, useParams} from "react-router-dom";
import {
    addToFavourite,
    getIsFavouring,
    getIsFetchingMovie,
    getMovie,
    MediaContent, stream,
    unFavourite
} from "src/entities/MediaContent";
import {className} from "src/shared/utils/className";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {ReactComponent as Camera} from "src/shared/assets/icons/camera.svg"
import {ReactComponent as Favourites} from "src/shared/assets/icons/favourites.svg"
import {ReactComponent as UnFavourites} from "src/shared/assets/icons/unfavourites.svg"
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {ReactComponent as Kinopoisk} from "src/shared/assets/icons/kinopoisk.svg"
import {ReactComponent as IMDB} from "src/shared/assets/icons/imdb.svg"
import ReactPlayer from "src/shared/ui/ReactPlayer";
import {Modal} from "src/shared/ui/Modal";
import {Favourite, getAuthUserData, userActions} from "src/entities/User";
import toast from "react-hot-toast";
import {getCSRFToken} from "src/entities/Auth";

const MoviesShowPage = () => {
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingMovie)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MediaContent | undefined>(undefined)
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    const [showFile, setShowFile] = useState<boolean>(false)
    const authData = useSelector(getAuthUserData)
    const trailerRef = useRef<any>()
    const fileRef = useRef<any>()
    const [trailer, setTrailer] = useState<string>('')
    const [file, setFile] = useState<string>('')
    const isFavouring = useSelector(getIsFavouring)
    const [isFavorited, setIsFavorited] = useState(false)
    const [url, setUrl] = useState<string>('')
    const csrfToken = useSelector(getCSRFToken)

    useEffect(() => {
        dispatch(getMovie(slug ?? ''))
            .then(data => {
                setMovie(data.payload)
            })
    }, [])

    const movieYear = useMemo(() => {
        if (!movie) {
            return ''
        }
        return movie.released_at.split('/')[2]
    }, [movie])

    const movieDuration = useMemo(() => {
        if (!movie) {
            return ''
        }
        const [hours, minutes, seconds] = movie.duration.split(':')
        if (hours) {
            return `${parseInt(hours)}ч ${parseInt(minutes)}мин ${parseInt(seconds)}сек`
        }
        return `${parseInt(minutes)}мин ${parseInt(seconds)}сек`
    }, [movie])

    const onTrailer = () => {
        setShowTrailer(true)
        // navigate(RoutesConfig.movie_trailer_show.path.replace(':id', `${id}`))
    }

    const getActors = (): Array<string> => {
        if (!movie) {
            return []
        }
        return movie.actors.map(actor => actor.first_name + ' ' + actor.last_name)
    }

    const getPlayBtnText = (): string => {
        if (authData) {
            return 'Смотреть'
        }
        if (!movie?.subscription_ids) {
            return 'Смотреть бесплатно'
        }
        if (!authData) {
            return 'Смотреть (30 сек.)'
        }
        return 'Смотреть по подписке'
    }

    const onPlay = () => {
        setShowFile(true)
    }

    const onShowTrailer = (value: boolean) => {
        setShowTrailer(value)
    }

    const onShowFile = (value: boolean) => {
        setShowFile(value)
        if (!value) {
            setUrl('')
        }
    }

    useEffect(() => {
        if (showTrailer) {
            setTrailer(movie?.trailer ?? '')
        } else {
            setTrailer('')
        }
    }, [showTrailer])

    useEffect(() => {
        if (showFile) {
            setFile(movie?.file ?? '')
        } else {
            setFile('')
        }
    }, [showFile])

    const onFavourite = async () => {
        if (!isFavouring) {
            const response = await dispatch(addToFavourite(movie?.id ?? 0))
            if (response.type.includes('fulfilled')) {
                toast('Успешно добавлено в избранное')
                setIsFavorited(true)
                if (authData) {
                    let favourites: Array<Favourite> = [...(authData?.favourites ?? [])]
                    favourites.push(response.payload)
                    dispatch(userActions.setAuthData({
                        id: authData.id,
                        firstname: authData.firstname,
                        lastname: authData.lastname,
                        phone: authData.phone,
                        roles: authData.roles,
                        favourites: favourites
                    }))
                }
            }
        }
    }

    const onUnFavourite = async () => {
        if (!isFavouring) {
            const favouriteId = (authData?.favourites ?? []).find(fav => fav.item.type === 'movie' && fav.item.id === movie?.id)?.id
            const response = await dispatch(unFavourite(favouriteId ?? 0))
            if (response.type.includes('fulfilled')) {
                toast(response.payload.message)
                setIsFavorited(false)
                if (authData) {
                    dispatch(userActions.setAuthData({
                        id: authData.id,
                        firstname: authData.firstname,
                        lastname: authData.lastname,
                        phone: authData.phone,
                        roles: authData.roles,
                        favourites: (authData.favourites ?? []).filter(fav => fav.id !== favouriteId)
                    }))
                }
            }
        }
    }

    useEffect(() => {
        if (!authData?.favourites || !movie) {
            setIsFavorited(false)
            return
        } else if (authData.favourites.length === 0) {
            setIsFavorited(false)
        }
        setIsFavorited(!!authData.favourites.filter(fav => fav.item.type === 'movie').find(fav => fav.item.id === movie.id))
    }, [authData, movie])

    useEffect(() => {
        const streamFile = async () => {
            const response = await dispatch(stream(movie?.id ?? 0))
            if (response.type.includes('fulfilled')) {
                setUrl(response.payload.data)
            }
        }
        if (showFile) {
            streamFile()
        }
    }, [showFile])

    const handleProgress = (state: any) => {
        if (!authData && state.playedSeconds >= 30) {
            setShowFile(false);
            toast('Чтобы посмотреть дальше надо войти в приложение!')
        }
    };

    return (
        <div className={classes.actorsPage} style={{height: fetching ? '700px' : 'fit-content'}}>
            <Modal
                value={showTrailer}
                onChange={onShowTrailer}
                style={{
                    backgroundColor: '#000',
                    maxWidth: '800px',
                    color: '#ececec'
                }}
            >
                <ReactPlayer
                    ref={trailerRef}
                    width={'100%'}
                    height={'100%'}
                    url={trailer}
                    controls={true}
                    playing={showTrailer}
                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                    onContextMenu={(e: any) => e.preventDefault()}
                />
            </Modal>
            <Modal
                value={showFile && url.length > 0}
                onChange={onShowFile}
                style={{
                    backgroundColor: '#000',
                    maxWidth: '800px',
                    color: '#ececec'
                }}
            >
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    url={url}
                    controls={true}
                    playing={showFile}
                    onProgress={handleProgress}
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                                crossOrigin: 'anonymous'
                            },
                            hlsOptions: {
                                xhrSetup: (xhr: any) => {
                                    xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
                                    xhr.setRequestHeader('X-XSRF-TOKEN', `Bearer ${csrfToken}`);
                                },
                            },
                            forceHLS: true
                        }
                    }}
                    onContextMenu={(e: any) => e.preventDefault()}
                />
            </Modal>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching}/>
                </>
            ) : (
                <div className={classes.detail}>
                    <div className={classes.detailWrapper}>
                        <img
                            src={movie ? movie.poster : ''}
                            alt="Background(poster)"
                            className={classes.detailWrapperBckg}
                        />
                        <div className={classes.overlay}>
                            <div className={classes.detailContainer}>
                                <div className={classes.detailDescription}>
                                    <h3 className={classes.movieName}>{movie?.name ?? ''}</h3>
                                    <div className={classes.movieRating}>
                                        {/*<div className={classes.ratingItem}>*/}
                                        {/*    <Play width={14} height={14} />*/}
                                        {/*    8.5*/}
                                        {/*</div>*/}
                                        {movie?.kinopoisk ? (
                                            <div className={classes.ratingItem}>
                                                <Kinopoisk stroke={'#fff'} width={14} height={14}/>
                                                {movie?.kinopoisk}
                                            </div>
                                        ) : null}
                                        {movie?.imdb ? (
                                            <div className={classes.ratingItem}>
                                                <IMDB stroke={'#fff'} width={18} height={18}/>
                                                {movie?.imdb}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className={classes.detailMeta}>
                                        <span className={classes.detailMetaItem}>{movieYear}</span>
                                        <span
                                            className={classes.detailMetaItem}>{movie ? movie.countries.map(country => country.name).join(',') : ''}</span>
                                        <span
                                            className={classes.detailMetaItem}>{movie ? movie.genres.map(genre => genre.name).join(',') : ''}</span>
                                        <span className={classes.detailMetaLabel}>{movieDuration}</span>
                                    </div>
                                    <div className={classes.detailActions}>
                                        <button onClick={onPlay}
                                                className={className(classes.detailAction, undefined, [classes.actionSee])}>
                                            <Play className={className(classes.icon, undefined, [classes.iconSee])}/>
                                            {getPlayBtnText()}
                                        </button>
                                        <button
                                            className={className(classes.detailAction, undefined, [classes.actionTrailer])}
                                            onClick={onTrailer}
                                        >
                                            <Camera
                                                className={className(classes.icon, undefined, [classes.iconTrailer])}/>
                                            Трейлер
                                        </button>
                                        {authData ? !isFavorited ? (
                                            <button onClick={onFavourite}
                                                    className={className(classes.detailAction, undefined, [classes.actionTrailer])}>
                                                {isFavouring ? <Fetching width={30} height={30}/> : (
                                                    <Favourites
                                                        className={className(classes.icon, undefined, [classes.iconTrailer])}/>
                                                )}
                                            </button>
                                        ) : (
                                            <button onClick={onUnFavourite}
                                                    className={className(classes.detailAction, undefined, [classes.actionTrailer])}>
                                                {isFavouring ? <Fetching width={30} height={30}/> : (
                                                    <UnFavourites
                                                        className={className(classes.icon, undefined, [classes.iconTrailer])}/>
                                                )}
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                                <div className={classes.detailContentContainer}>
                                    <div className={classes.detailContent}>
                                        {/*<h3 className={classes.detailContentTitle}>Описание</h3>*/}
                                        <p className={classes.detailContentText}>
                                            {movie?.description ?? ''}
                                        </p>
                                    </div>
                                    <div className={classes.mainActors}>
                                        В главных ролях: {getActors().join(', ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.sectionTitle}>Актеры</h3>
                        <CustomSwiper views={2} style={{height: '100%'}}>
                            {movie ? movie.actors.map(actor => (
                                <SwiperSlide
                                    key={`actor${actor.id}`}
                                    className={classes.actor}
                                >
                                    <img
                                        className={classes.actorAvatar}
                                        src={actor.avatar}
                                        alt={actor.first_name + ' ' + actor.last_name}
                                    />
                                    <span
                                        className={classes.actorName}>{actor.first_name + ' ' + actor.last_name}</span>
                                    <span className={classes.actorLabel}>актёр</span>
                                </SwiperSlide>
                            )) : null}
                        </CustomSwiper>
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.sectionTitle}>Информация о фильме</h3>
                        <div className={classes.movieAdditional}>
                            <div className={classes.movieInfo}>
                                <h3 className={classes.movieInfoTitle}>Сюжет</h3>
                                <p className={classes.movieInfoContent}>
                                    {movie?.description ?? ''}
                                </p>
                            </div>
                            <div className={classes.movieExtraInfo}>
                                <div className={classes.extraInfoWrapper}>
                                    <div className={classes.extraInfoCard}>
                                        <span className={classes.infoCardLabel}>Год выпуска</span>
                                        <span className={classes.infoCardText}>{movieYear}</span>
                                    </div>
                                    <div className={classes.extraInfoCard}>
                                        <span className={classes.infoCardLabel}>Жанр</span>
                                        <span
                                            className={classes.infoCardText}>{movie ? movie.genres.map(genre => genre.name).join(',') : ''}</span>
                                    </div>
                                    <div className={classes.extraInfoCard}>
                                        <span className={classes.infoCardLabel}>Длительность</span>
                                        <span className={classes.infoCardText}>{movieDuration}</span>
                                    </div>
                                    <div className={classes.extraInfoCard}>
                                        <span className={classes.infoCardLabel}>Страна</span>
                                        <span
                                            className={classes.infoCardText}>{movie ? movie.countries.map(country => country.name).join(',') : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MoviesShowPage
