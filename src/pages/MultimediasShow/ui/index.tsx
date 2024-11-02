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
    getMultimedia,
    MediaContent, stream, unFavourite
} from "src/entities/MediaContent";
import {className} from "src/shared/utils/className";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {ReactComponent as Favourites} from "src/shared/assets/icons/favourites.svg"
import {ReactComponent as UnFavourites} from "src/shared/assets/icons/unfavourites.svg"
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {ReactComponent as Kinopoisk} from "src/shared/assets/icons/kinopoisk.svg"
import {ReactComponent as IMDB} from "src/shared/assets/icons/imdb.svg"
import {Modal} from "src/shared/ui/Modal";
import {Favourite, getAuthUserData, userActions} from "src/entities/User";
import toast from "react-hot-toast";
import ReactPlayer from "src/shared/ui/ReactPlayer";
import {getCSRFToken} from "src/entities/Auth";

const MultimediasShowPage = () => {
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingMovie)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [multimedia, setMultimedia] = useState<MediaContent | undefined>(undefined)
    const [showFile, setShowFile] = useState<boolean>(false)
    const [file, setFile] = useState<string>('')
    const fileRef = useRef<any>()
    const authData = useSelector(getAuthUserData)
    const isFavouring = useSelector(getIsFavouring)
    const [isFavorited, setIsFavorited] = useState(false)
    const [url, setUrl] = useState<string>('')
    const csrfToken = useSelector(getCSRFToken)

    useEffect(() => {
        dispatch(getMultimedia(slug ?? ''))
            .then(data => {
                setMultimedia(data.payload)
            })
    }, [])

    const movieYear = useMemo(() => {
        if (!multimedia) {
            return ''
        }
        return multimedia.released_at.split('/')[2]
    }, [multimedia])

    const movieDuration = useMemo(() => {
        if (!multimedia) {
            return ''
        }
        const [hours, minutes] = multimedia.duration.split(':')
        return `${parseInt(hours)}ч ${parseInt(minutes)}мин`
    }, [multimedia])

    const getActors = (): Array<string> => {
        if (!multimedia) {
            return []
        }
        return multimedia.actors.map(actor => actor.first_name + ' ' + actor.last_name)
    }

    const onShowFile = (value: boolean) => {
        setShowFile(value)
        if (!value) {
            setUrl('')
        }
    }

    useEffect(() => {
        if (showFile) {
            setFile(multimedia?.file ?? '')
        } else {
            setFile('')
        }
    }, [showFile])

    const onPlay = () => {
        setShowFile(true)
    }

    const onFavourite = async () => {
        if (!isFavouring) {
            const response = await dispatch(addToFavourite(multimedia?.id ?? 0))
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
            const favouriteId = (authData?.favourites ?? []).find(fav => fav.item.type === 'multimedia' && fav.item.id === multimedia?.id)?.id
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
        if (!authData?.favourites || !multimedia) {
            setIsFavorited(false)
            return
        } else if (authData.favourites.length === 0) {
            setIsFavorited(false)
        }
        setIsFavorited(!!authData.favourites.filter(fav => fav.item.type === 'multimedia').find(fav => fav.item.id === multimedia.id))
    }, [authData, multimedia])

    useEffect(() => {
        const streamFile = async () => {
            const response = await dispatch(stream(multimedia?.id ?? 0))
            if (response.type.includes('fulfilled')) {
                setUrl(response.payload.data)
            }
        }
        if (showFile) {
            streamFile()
        }
    }, [showFile])

    return (
        <div className={classes.actorsPage} style={{height: fetching ? '700px' : 'fit-content'}}>
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
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <div className={classes.detail}>
                        <div className={classes.detailWrapper}>
                            <img
                                src={multimedia ? multimedia.poster : ''}
                                alt="Background(poster)"
                                className={classes.detailWrapperBckg}
                            />
                            <div className={classes.overlay}>
                                <div className={classes.detailContainer}>
                                    <div className={classes.detailDescription}>
                                        <h3 className={classes.movieName}>{multimedia?.name ?? ''}</h3>
                                        <div className={classes.movieRating}>
                                            {/*<div className={classes.ratingItem}>*/}
                                            {/*    <Play width={14} height={14} />*/}
                                            {/*    8.5*/}
                                            {/*</div>*/}
                                            <div className={classes.ratingItem}>
                                                <Kinopoisk stroke={'#fff'} width={14} height={14} />
                                                6.3
                                            </div>
                                            <div className={classes.ratingItem}>
                                                <IMDB stroke={'#fff'} width={18} height={18} />
                                                6.2
                                            </div>
                                        </div>
                                        <div className={classes.detailMeta}>
                                            <span className={classes.detailMetaItem}>{movieYear}</span>
                                            <span className={classes.detailMetaItem}>{multimedia ? multimedia.genres.map(genre => genre.name).join(',') : ''}</span>
                                            <span className={classes.detailMetaLabel}>{movieDuration}</span>
                                        </div>
                                        <div className={classes.detailActions}>
                                            {authData ? (
                                                <button onClick={onPlay} className={className(classes.detailAction, undefined, [classes.actionSee])}>
                                                    <Play className={className(classes.icon, undefined, [classes.iconSee])} />
                                                    Смотреть
                                                </button>
                                            ) : null}
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
                                                {multimedia?.description ?? ''}
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
                                {multimedia ? multimedia.actors.map(actor => (
                                    <SwiperSlide
                                        key={`actor${actor.id}`}
                                        className={classes.actor}
                                    >
                                        <img
                                            className={classes.actorAvatar}
                                            src={actor.avatar}
                                            alt={actor.first_name + ' ' + actor.last_name}
                                        />
                                        <span className={classes.actorName}>{actor.first_name + ' ' + actor.last_name}</span>
                                        <span className={classes.actorLabel}>актёр</span>
                                    </SwiperSlide>
                                )) : null}
                            </CustomSwiper>
                        </div>
                        <div className={classes.section}>
                            <h3 className={classes.sectionTitle}>Информация о шоу</h3>
                            <div className={classes.movieAdditional}>
                                <div className={classes.movieInfo}>
                                    <h3 className={classes.movieInfoTitle}>Сюжет</h3>
                                    <p className={classes.movieInfoContent}>
                                        {multimedia?.description ?? ''}
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
                                            <span className={classes.infoCardText}>{multimedia ? multimedia.genres.map(genre => genre.name).join(',') : ''}</span>
                                        </div>
                                        <div className={classes.extraInfoCard}>
                                            <span className={classes.infoCardLabel}>Длительность</span>
                                            <span className={classes.infoCardText}>{movieDuration}</span>
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

export default MultimediasShowPage
