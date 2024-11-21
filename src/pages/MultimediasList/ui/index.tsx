import classes from './index.module.css'
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {getAllMultimedias, getIsFetchingAllMovies, MediaContent} from "src/entities/MediaContent";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {SelectContainer, Option, SelectedOption, CheckboxOption} from "src/shared/ui/SelectContainer";
import {className} from "src/shared/utils/className";
import {Genre, getIsFetchingList, getListGenres} from "src/entities/Genre";
// import ReactPlayer from "ReactPlayer";
import {Marquee} from "src/shared/ui/Marquee";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const MultimediasListPage = () => {
    const navigate = useNavigate()
    const isFetchingMovies = useSelector(getIsFetchingAllMovies)
    const [firstTime, setFirstTime] = useState(true)
    const [shows, setShows] = useState<Array<MediaContent>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<number>(0)
    const [free, setFree] = useState<boolean>(false)
    const [hoveredFree, setHoveredFree] = useState<boolean>(false)
    const [genres, setGenres] = useState<Array<Genre>>([])
    const isFetchingAllGenres = useSelector(getIsFetchingList)
    const [genre, setGenre] = useState<Array<string>>([])
    const [year, setYear] = useState<Array<string>>([''])
    const [showMovies2022, setShowMovies2022] = useState<boolean>(false)
    const [showMovies2023, setShowMovies2023] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)

    const observerRef = useRef<IntersectionObserver | undefined>(undefined)
    const lastMovieRef = useCallback((node: HTMLDivElement) => {
        if (loading) return
        if (observerRef.current) observerRef.current?.disconnect()
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1)
            }
        })
        if (node) observerRef.current?.observe(node)
    }, [loading, hasMore])
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            switch (location.state.type) {
                case 'year':
                    if (location.state.value === '2022') {
                        onShowMovie2022()
                    } else if (location.state.value === '2023') {
                        onShowMovie2023()
                    }
                    break
            }
        }
    }, [location])

    const onShowMovie2022 = () => {
        setShows([])
        if (year.includes('2022')) {
            setYear(year.filter(item => item !== '2022'))
            setShowMovies2022(false)
        } else {
            setYear([...year, '2022'])
            setShowMovies2022(true)
        }
    }

    const onShowMovie2023 = () => {
        setShows([])
        if (year.includes('2023')) {
            setYear(year.filter(item => item !== '2023'))
            setShowMovies2023(false)
        } else {
            setYear([...year, '2023'])
            setShowMovies2023(true)
        }
    }

    useEffect(() => {
        const fetchSections = async () => {
            const data = await dispatch(getAllMultimedias({page}))
            if (data.type.includes('fulfilled')) {
                setShows(data.payload.data)
                setHasMore(data.payload.more)
                setFirstTime(false)
            }
        }
        const fetchGenres = async () => {
            const data = await dispatch(getListGenres())
            if (data.type.includes('fulfilled')) {
                setGenres(data.payload.data)
            }
        }
        fetchSections()
        fetchGenres()
    }, [])

    useEffect(() => {
        const allGenres = genre.filter(g => !!g)
        const allYears = year.filter(g => !!g)
        const fetchMovies = async (params: {
            genre?: boolean,
            free?: boolean,
            year?: boolean,
        }) => {
            let currentPage = page
            if (params.genre || params.free || params.year) {
                currentPage = 1
            }
            let requestData: {[key: string]: any} = {
                page: currentPage,
            }

            if (params.genre) {
                requestData['genres'] = allGenres
            }
            if (params.free ) {
                requestData['free'] = true
            }
            if (params.year ) {
                requestData['years'] = allYears
            }

            setLoading(true)
            const response = await dispatch(getAllMultimedias(requestData))
            setLoading(false)
            if (response.type.includes('fulfilled')) {
                setShows((prevShows) => [...prevShows, ...response.payload.data.filter((newShow: any) => !prevShows.some(existingShow => existingShow.id === newShow.id))])
                setHasMore(response.payload.more)
            }
        }

        fetchMovies({
            genre: allGenres.length > 0,
            free: free,
            year: allYears.length > 0,
        })
        const searchObj: any = {}
        if (allGenres.length > 0) {
            searchObj['genres'] = allGenres.join(',')
        }
        if (allYears.length > 0) {
            searchObj['year'] = allYears.join(',')
        }
        if (free) {
            searchObj['free'] = free ? 1 : 0
        }

        setSearchParams(searchObj)
    }, [genre, free, year, page])

    const onHover = (id: number) => {
        setHovered(id)
    }

    const onUnHover = () => {
        setHovered(0)
    }

    const onPage = (item: MediaContent) => {
        navigate(RoutesConfig.multimedias_show.path.replace(':slug', `${item.slug}`))
    }

    const onGenreOptionSelect = (option: SelectedOption) => {
        setShows([])
        setGenre([option.value])
    }

    const onGenreCheckboxSelect = (option: SelectedOption) => {
        setShows([])
        if (genre.includes(option.value)) {
            setGenre(genre.filter(item => item !== 'all').filter(item => item !== option.value))
        } else {
            setGenre([...genre.filter(item => item !== 'all'), option.value])
        }
    }

    const onYearOptionSelect = (option: SelectedOption) => {
        setShows([])
        setYear([option.value])
    }

    const onYearCheckboxSelect = (option: SelectedOption) => {
        setShows([])
        if (year.includes(option.value)) {
            setYear(year.filter(item => item !== 'all').filter(item => item !== option.value))
        } else {
            setYear([...year.filter(item => item !== 'all'), option.value])
        }
    }

    const onFree = () => {
        setShows([])
        setFree(!free)
    }

    const onFreeEnter = () => {
        setHoveredFree(true)
    }

    const onFreeLeave = () => {
        setHoveredFree(false)
    }

    return (
        <div className={classes.mainPage} style={{minHeight: isFetchingMovies ? '100vh' : 'fit-content'}}>
            {isFetchingMovies && firstTime ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <div className={classes.pageWrapper}>
                        <h1 className={classes.pageTitle}>Шоу смотреть онлайн</h1>
                        <div className={classes.filters}>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showMovies2023
                                })}
                                onClick={onShowMovie2023}
                            >
                                Шоу 2023
                            </div>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showMovies2022
                                })}
                                onClick={onShowMovie2022}
                            >
                                Шоу 2022
                            </div>
                            {/*<Select*/}
                            {/*    placeholder={'Категория'}*/}
                            {/*    onSelect={onCategory}*/}
                            {/*    value={''}*/}
                            {/*    style={{width: '242px'}}*/}
                            {/*>*/}
                            {/*    <Option label={'Фильмы'} value={'movie'} />*/}
                            {/*    <Option label={'Сериалы'} value={'series'} />*/}
                            {/*    <Option label={'Шоу'} value={'multimedia'} />*/}
                            {/*</Select>*/}
                            <SelectContainer
                                cls={classes.select}
                                onOptionSelect={onGenreOptionSelect}
                                onCheckboxSelect={onGenreCheckboxSelect}
                                value={genre}
                                placeholder={'Жанр'}
                                style={{width: '242px'}}
                                loading={isFetchingAllGenres}
                            >
                                <Option label={'Все'} value={'all'} />
                                {genres.length ? genres.map(genre => (
                                    <CheckboxOption
                                        key={`genre${genre.id}`}
                                        label={genre.name}
                                        value={genre.id}
                                    />
                                )) : null}
                            </SelectContainer>
                            <SelectContainer
                                cls={classes.select}
                                onOptionSelect={onYearOptionSelect}
                                onCheckboxSelect={onYearCheckboxSelect}
                                value={year}
                                placeholder={'Год'}
                                style={{width: '242px'}}
                            >
                                <Option label={'Все'} value={'all'} />
                                <CheckboxOption label={'2024'} value={'2024'} />
                                <CheckboxOption label={'2023'} value={'2023'} />
                                <CheckboxOption label={'2022'} value={'2022'} />
                                <CheckboxOption label={'2021'} value={'2021'} />
                                <CheckboxOption label={'2020'} value={'2020'} />
                                <CheckboxOption label={'2019'} value={'2019'} />
                                <CheckboxOption label={'2018'} value={'2018'} />
                                <CheckboxOption label={'2017'} value={'2017'} />
                                <CheckboxOption label={'2016'} value={'2016'} />
                                <CheckboxOption label={'2015'} value={'2015'} />
                                <CheckboxOption label={'2014'} value={'2014'} />
                                <CheckboxOption label={'2013'} value={'2013'} />
                                <CheckboxOption label={'2012'} value={'2012'} />
                            </SelectContainer>
                            <div
                                className={classes.free}
                                onClick={onFree}
                            >
                                <div
                                    className={className(classes.checkbox, {
                                        [classes.activeCheckbox]: free,
                                        [classes.hoveredCheckbox]: hoveredFree,
                                    })}
                                    onMouseEnter={onFreeEnter}
                                    onMouseLeave={onFreeLeave}
                                >
                                    <svg
                                        width={18}
                                        height={18}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                Бесплатно
                            </div>
                        </div>
                        <div className={classes.sections}>
                            {shows.length && !(loading || isFetchingMovies) ? shows.map((item, index) => {
                                if (shows.length === index + 1) {
                                    return (
                                        <div
                                            ref={lastMovieRef}
                                            key={item.id}
                                            onClick={() => onPage(item)}
                                            className={classes.section}
                                        >
                                            <img
                                                src={item.small_poster}
                                                alt="Poster"
                                                className={classes.contentImg}
                                                onMouseEnter={() => onHover(item.id)}
                                                onMouseLeave={onUnHover}
                                            />
                                            {!item.subscription_ids.length ? (
                                                <div className={classes.freeLabel}>
                                                    Бесплатно
                                                </div>
                                            ) : null}
                                            <button
                                                type={'button'}
                                                className={classes.playBtn}
                                                style={{opacity: hovered === item.id ? '1' : '0'}}
                                            >
                                                <Play className={classes.playIcon} />
                                            </button>
                                            <span
                                                className={className(classes.contentLabel, null, [classes.marquee])}
                                                style={{opacity: hovered === item.id ? '1' : '0'}}
                                            >
                                                <span className={classes.child}>
                                                    <span className={classes.contentName}>
                                                        {item.name} / {item.genres.map(genre => genre.name).join(', ')}
                                                    </span>
                                                </span>
                                            </span>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => onPage(item)}
                                        className={classes.section}
                                    >
                                        <img
                                            src={item.small_poster}
                                            alt="Poster"
                                            className={classes.contentImg}
                                            onMouseEnter={() => onHover(item.id)}
                                            onMouseLeave={onUnHover}
                                        />
                                        {!item.subscription_ids.length ? (
                                            <div className={classes.freeLabel}>
                                                Бесплатно
                                            </div>
                                        ) : null}
                                        <button
                                            type={'button'}
                                            className={classes.playBtn}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                            <Play className={classes.playIcon} />
                                        </button>
                                        <span
                                            className={className(classes.contentLabel, null, [classes.marquee])}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                            <span className={classes.child}>
                                                <span className={classes.contentName}>
                                                    {item.name} / {item.genres.map(genre => genre.name).join(', ')}
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                )
                            }) : !loading ? (
                                <h1 className={classes.noRecords}>Нет шоу</h1>
                            ) : null}
                        </div>
                        {/*{isFetchingMovies ? (*/}
                        {/*    <Fetching className={classes.fetchingMore} />*/}
                        {/*) : null}*/}
                        {(loading || isFetchingMovies) ? (
                            <div className={classes.sections}>
                                {Array.from(Array(8).keys()).map(index => {
                                    return (
                                        <div
                                            key={index}
                                            className={className(classes.section, null, [classes.skeleton])}
                                        >
                                            <Skeleton height={'100%'} width={'100%'} />
                                        </div>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    )
}

export default MultimediasListPage
