import classes from './index.module.css'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading.svg'
import {useNavigate, useParams} from "react-router-dom";
import {getIsFetchingMovie, getMovie, MediaContent} from "src/entities/MediaContent";
import {className} from "src/shared/utils/className";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {ReactComponent as Camera} from "src/shared/assets/icons/camera.svg"
import {ReactComponent as Favourites} from "src/shared/assets/icons/favourites.svg"
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Kinopoisk} from "src/shared/assets/icons/kinopoisk.svg"
import {ReactComponent as IMDB} from "src/shared/assets/icons/imdb.svg"
import ReactPlayer from "react-player";
import {Modal} from "src/shared/ui/Modal";
import {getAuthUserData} from "src/entities/User";

const MoviesShowPage = () => {
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingMovie)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MediaContent | undefined>(undefined)
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    const authData = useSelector(getAuthUserData)

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
        const [hours, minutes] = movie.duration.split(':')
        return `${parseInt(hours)}ч ${parseInt(minutes)}мин`
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
        return 'Смотреть по подписке'
    }

    const onPlay = () => {

    }

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
                    url={movie?.trailer ?? ''}
                    controls={true}
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
                                                    <Kinopoisk stroke={'#fff'} width={14} height={14} />
                                                    {movie?.kinopoisk}
                                                </div>
                                            ) : null}
                                            {movie?.imdb ? (
                                                <div className={classes.ratingItem}>
                                                    <IMDB stroke={'#fff'} width={18} height={18} />
                                                    {movie?.imdb}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className={classes.detailMeta}>
                                            <span className={classes.detailMetaItem}>{movieYear}</span>
                                            <span className={classes.detailMetaItem}>{movie ? movie.countries.map(country => country.name).join(',') : ''}</span>
                                            <span className={classes.detailMetaItem}>{movie ? movie.genres.map(genre => genre.name).join(',') : ''}</span>
                                            <span className={classes.detailMetaLabel}>{movieDuration}</span>
                                        </div>
                                        <div className={classes.detailActions}>
                                            <button className={className(classes.detailAction, undefined, [classes.actionSee])}>
                                                <Play className={className(classes.icon, undefined, [classes.iconSee])} />
                                                {getPlayBtnText()}
                                            </button>
                                            <button
                                                className={className(classes.detailAction, undefined, [classes.actionTrailer])}
                                                onClick={onTrailer}
                                            >
                                                <Camera className={className(classes.icon, undefined, [classes.iconTrailer])} />
                                                Трейлер
                                            </button>
                                            <button className={className(classes.detailAction, undefined, [classes.actionTrailer])}>
                                                <Favourites className={className(classes.icon, undefined, [classes.iconTrailer])} />
                                            </button>
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
                                        <span className={classes.actorName}>{actor.first_name + ' ' + actor.last_name}</span>
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
                                            <span className={classes.infoCardText}>{movie ? movie.genres.map(genre => genre.name).join(',') : ''}</span>
                                        </div>
                                        <div className={classes.extraInfoCard}>
                                            <span className={classes.infoCardLabel}>Длительность</span>
                                            <span className={classes.infoCardText}>{movieDuration}</span>
                                        </div>
                                        <div className={classes.extraInfoCard}>
                                            <span className={classes.infoCardLabel}>Страна</span>
                                            <span className={classes.infoCardText}>{movie ? movie.countries.map(country => country.name).join(',') : ''}</span>
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
