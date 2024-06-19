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
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {RoutesConfig} from "src/shared/config/routes";
import {getIsFetchingUserSeries, getUserSeries, Series} from "src/entities/Series";
import ReactPlayer from "react-player";
import {Modal} from "src/shared/ui/Modal";
import {getAuthUserData} from "src/entities/User";

const SeriesShowPage = () => {
    const authData = useSelector(getAuthUserData)
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingUserSeries)
    const {id} = useParams()
    const navigate = useNavigate()
    const [currentSeason, setCurrentSeason] = useState(0)
    const [showTrailer, setShowTrailer] = useState<boolean>(false)
    const [episode, setEpisode] = useState<string>('')
    const [series, setSeries] = useState<Series | undefined>(undefined)

    useEffect(() => {
        dispatch(getUserSeries(parseInt(id ?? '0')))
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
                file: episode.file,
            }
        })
    }, [series, currentSeason])

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
                />
            </Modal>
            <Modal
                value={episode.length > 0 && !!authData}
                onChange={(value: boolean) => setEpisode('')}
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
                            <div className={classes.detailContainer}>
                                <div className={classes.detailDescription}>
                                    <h3 className={classes.movieName}>{series?.name ?? ''}</h3>
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
                                        <button className={className(classes.detailAction, undefined, [classes.actionTrailer])}>
                                            <Favourites className={className(classes.icon, undefined, [classes.iconTrailer])} />
                                        </button>
                                    </div>
                                </div>
                                <div className={classes.detailContent}>
                                    <h3 className={classes.detailContentTitle}>Описание</h3>
                                    <p className={classes.detailContentText}>
                                        {series?.description ?? ''}
                                    </p>
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
                                            onClick={() => setEpisode(episode.file)}
                                        >
                                            <ReactPlayer
                                                width={408}
                                                height={230}
                                                url={episode.file}
                                                // light={true}
                                                controls={false}
                                                playing={false}
                                            />
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
                                        <span className={classes.infoCardText}>3 сезона</span>
                                    </div>
                                    <div className={classes.extraInfoCard}>
                                        <span className={classes.infoCardLabel}>Страна</span>
                                        <span className={classes.infoCardText}>{series ? series.countries.map(country => country.name).join(',') : ''}</span>
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
