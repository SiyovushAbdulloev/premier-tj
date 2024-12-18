import classes from './index.module.css'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading.svg'
import {useNavigate, useParams} from "react-router-dom";
import {className} from "src/shared/utils/className";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {ReactComponent as Camera} from "src/shared/assets/icons/camera.svg"
import {ReactComponent as Favourites} from "src/shared/assets/icons/favourites.svg"
import {ReactComponent as UnFavourites} from "src/shared/assets/icons/unfavourites.svg"
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {getIsFavouring, getIsFetchingUserSeries, getUserSeries, Series, addToFavourite, unFavourite} from "src/entities/Series";
import {Modal} from "src/shared/ui/Modal";
import {Favourite, getAuthUserData, userActions} from "src/entities/User";
import {ReactComponent as Kinopoisk} from "src/shared/assets/icons/kinopoisk.svg"
import {ReactComponent as IMDB} from "src/shared/assets/icons/imdb.svg"
import toast from "react-hot-toast";
import {stream} from "src/entities/SeasonEpisode";
import {getCSRFToken} from "src/entities/Auth";
import ReactPlayer from "src/shared/ui/ReactPlayer";

const SeriesShowPage = () => {
    const authData = useSelector(getAuthUserData)
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingUserSeries)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [currentSeason, setCurrentSeason] = useState(0)
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    const [episode, setEpisode] = useState<string>('')
    const [series, setSeries] = useState<Series | undefined>(undefined)
    const isFavouring = useSelector(getIsFavouring)
    const [isFavorited, setIsFavorited] = useState(false)
    const csrfToken = useSelector(getCSRFToken)

    useEffect(() => {
        dispatch(getUserSeries(slug ?? ''))
            .then(data => {
                setSeries(data.payload)
            })
    }, [])

    const movieYear = useMemo(() => {
        if (!series) {
            return ''
        }
        return series.released_at.split('/')[2]
    }, [series])

    const onTrailer = () => {
        setShowTrailer(true)
        // navigate(RoutesConfig.movie_trailer_show.path.replace(':id', `${id}`))
    }

    const seriesSeasons = useMemo(() => {
        if (!series) {
            return []
        } else if (!series.seasons.length) {
            return []
        }
        return series.seasons.map(season => season.number)
    }, [series, currentSeason])

    const seasonEpisodes = useMemo(() => {
        if (!series) {
            return []
        } else if (!series.seasons.length) {
            return []
        } else if (!series.seasons[currentSeason].episodes.length) {
            return []
        }
        return series.seasons[currentSeason].episodes.map(episode => {
            return {
                id: episode.id,
                number: episode.number,
                description: episode.description,
                duration: episode.duration,
                poster: episode.poster,
                file: episode.file,
            }
        })
    }, [series, currentSeason])

    const getActors = (): Array<string> => {
        if (!series) {
            return []
        }
        return series.actors.map(actor => actor.first_name + ' ' + actor.last_name)
    }

    const onFavourite = async () => {
        if (!isFavouring) {
            const response = await dispatch(addToFavourite(series?.id ?? 0))
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
            const favouriteId = (authData?.favourites ?? []).find(fav => fav.item.type === 'series' && fav.item.id === series?.id)?.id
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
        if (!authData?.favourites || !series) {
            setIsFavorited(false)
            return
        } else if (authData.favourites.length === 0) {
            setIsFavorited(false)
        }
        setIsFavorited(!!authData.favourites.filter(fav => fav.item.type === 'series').find(fav => fav.item.id === series.id))
    }, [authData, series])

    const onEpisode = async (id: number) => {
        const response = await dispatch(stream(id))
        if (response.type.includes('fulfilled')) {
            setEpisode(response.payload.data)
        }
    }

    const onShowPlay = (value: boolean) => {
        if (!value) {
            setEpisode('')
        }
    }

    const handleProgress = (state: any) => {
        // Pause the video at 30 seconds for non-authenticated users
        if (!authData && state.playedSeconds >= 30) {
            setEpisode('');
            toast('Чтобы посмотреть дальше надо войти в приложение!')
        }
    };

    return (
        <div className={classes.actorsPage} style={{height: fetching ? '700px' : 'fit-content'}}>
            <Modal
                value={showTrailer}
                onChange={(value: boolean) => setShowTrailer(value)}
                style={{
                    backgroundColor: '#000',
                    maxWidth: '800px',
                    color: '#ececec'
                }}
            >
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    url={series?.trailer ?? ''}
                    controls={true}
                    playing={showTrailer}
                    onContextMenu={(e: any) => e.preventDefault()}
                />
            </Modal>
            <Modal
                value={episode.length > 0 }
                onChange={onShowPlay}
                style={{
                    backgroundColor: '#000',
                    maxWidth: '800px',
                    color: '#ececec'
                }}
            >
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    url={episode}
                    controls={true}
                    playing={episode.length > 0}
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
                                src={series ? series.poster : ''}
                                alt="Background(poster)"
                                className={classes.detailWrapperBckg}
                            />
                            <div className={classes.overlay}>
                                <div className={classes.detailContainer}>
                                    <div className={classes.detailDescription}>
                                        <h3 className={classes.movieName}>{series?.name ?? ''}</h3>
                                        <div className={classes.movieRating}>
                                            {/*<div className={classes.ratingItem}>*/}
                                            {/*    <Play width={14} height={14} />*/}
                                            {/*    8.5*/}
                                            {/*</div>*/}
                                            {series?.kinopoisk ? (
                                                <div className={classes.ratingItem}>
                                                    <Kinopoisk stroke={'#fff'} width={14} height={14} />
                                                    {series?.kinopoisk}
                                                </div>
                                            ) : null}
                                            {series?.imdb ? (
                                                <div className={classes.ratingItem}>
                                                    <IMDB stroke={'#fff'} width={18} height={18} />
                                                    {series?.imdb}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className={classes.detailMeta}>
                                            <span className={classes.detailMetaItem}>{movieYear}</span>
                                            <span className={classes.detailMetaItem}>{series ? series.countries.map(country => country.name).join(',') : ''}</span>
                                            <span className={classes.detailMetaItem}>{series ? series.genres.map(genre => genre.name).join(',') : ''}</span>
                                            <span className={classes.detailMetaLabel}>3 сезона</span>
                                        </div>
                                        <div className={classes.detailActions}>
                                            {/*{authData ? (*/}
                                            {/*    <button className={className(classes.detailAction, undefined, [classes.actionSee])}>*/}
                                            {/*        <Play className={className(classes.icon, undefined, [classes.iconSee])} />*/}
                                            {/*        Смотреть по подписке*/}
                                            {/*    </button>*/}
                                            {/*) : null}*/}
                                            <button
                                                className={className(classes.detailAction, undefined, [classes.actionTrailer])}
                                                onClick={onTrailer}
                                            >
                                                <Camera className={className(classes.icon, undefined, [classes.iconTrailer])} />
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
                                            <h3 className={classes.detailContentTitle}>Описание</h3>
                                            <p className={classes.detailContentText}>
                                                {series?.description ?? ''}
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
                            <header className={classes.sectionHeader}>
                                <h3 className={classes.sectionTitle}>Сезоны</h3>
                                <ul className={classes.seasons}>
                                    {seriesSeasons.map((season, index) => (
                                        <li
                                            onClick={() => setCurrentSeason(index)}
                                            className={className(classes.season, {
                                                [classes.activeSeason]: index === currentSeason
                                            })}
                                            key={`seasonNumber${season}`}
                                        >
                                            {season}
                                        </li>
                                    ))}
                                </ul>
                            </header>
                            <CustomSwiper views={2} style={{height: '100%'}}>
                                {seasonEpisodes.map(episode => (
                                    <SwiperSlide
                                        key={`actor${episode.id}`}
                                        className={classes.episodeSlide}
                                    >
                                        <div
                                            className={classes.episodeAvatar}
                                            onClick={() => onEpisode(episode.id)}
                                        >
                                            <img
                                                src={episode.poster}
                                                alt="Poster"
                                                className={classes.episodePoster}
                                            />
                                            {/*<ReactPlayer*/}
                                            {/*    width={408}*/}
                                            {/*    height={230}*/}
                                            {/*    url={episode.file}*/}
                                            {/*    controls={false}*/}
                                            {/*    playing={false}*/}
                                            {/*/>*/}
                                            <span className={classes.episodeDuration}>{episode.duration}</span>
                                        </div>
                                        <span className={classes.episodeName}>{episode.number} серия</span>
                                        <span className={classes.episodeLabel}>{episode.description.slice(0, 250) + '...'}</span>
                                    </SwiperSlide>
                                ))}
                            </CustomSwiper>
                        </div>
                        <div className={classes.section}>
                            <h3 className={classes.sectionTitle}>Актеры</h3>
                            <CustomSwiper views={2} style={{height: '100%'}}>
                                {series ? series.actors.map(actor => (
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
                            <h3 className={classes.sectionTitle}>Информация о сериале</h3>
                            <div className={classes.movieAdditional}>
                                <div className={classes.movieInfo}>
                                    <h3 className={classes.movieInfoTitle}>Сюжет</h3>
                                    <p className={classes.movieInfoContent}>
                                        {series?.description ?? ''}
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
                                            <span className={classes.infoCardText}>{series ? series.genres.map(genre => genre.name).join(',') : ''}</span>
                                        </div>
                                        <div className={classes.extraInfoCard}>
                                            <span className={classes.infoCardLabel}>Длительность</span>
                                            <span className={classes.infoCardText}>{series?.seasons ? series.seasons.length : 0} сезон</span>
                                        </div>
                                        <div className={classes.extraInfoCard}>
                                            <span className={classes.infoCardLabel}>Страна</span>
                                            <span className={classes.infoCardText}>{series ? series.countries.map(country => country.name).join(',') : ''}</span>
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

export default SeriesShowPage
