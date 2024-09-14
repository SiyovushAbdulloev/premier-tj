import classes from './index.module.css'
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {SelectContainer, Option, SelectedOption, CheckboxOption} from "src/shared/ui/SelectContainer";
import {className} from "src/shared/utils/className";
import {getIsFetchingListSeries, getListSeries, Series} from "src/entities/Series";
import ReactPlayer from "react-player";
import {Genre, getIsFetchingList, getListGenres} from "src/entities/Genre";
import {Country, getIsFetchinList as getIsFetchingCountryList, getListCountries} from "src/entities/Country";
import {Marquee} from "src/shared/ui/Marquee";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SeriesListPage = () => {
    const navigate = useNavigate()
    const isFetchingSeries = useSelector(getIsFetchingListSeries)
    const [firstTime, setFirstTime] = useState<boolean>(false)
    const [series, setSeries] = useState<Array<Series>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<number>(0)
    const [free, setFree] = useState<boolean>(false)
    const [hoveredFree, setHoveredFree] = useState<boolean>(false)
    const [genres, setGenres] = useState<Array<Genre>>([])
    const isFetchingAllGenres = useSelector(getIsFetchingList)
    const [countries, setCountries] = useState<Array<Country>>([])
    const isFetchingAllCountries = useSelector(getIsFetchingCountryList)
    const [genre, setGenre] = useState<Array<string>>([])
    const [country, setCountry] = useState<Array<string>>([''])
    const [year, setYear] = useState<Array<string>>([''])
    const [showSeries2022, setShowSeries2022] = useState<boolean>(false)
    const [showSeries2023, setShowSeries2023] = useState<boolean>(false)
    const [showTajik, setShowTajik] = useState<boolean>(false)
    const [showRussian, setShowRussian] = useState<boolean>(false)
    const [showForeign, setShowForeign] = useState<boolean>(false)
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
                case 'country':
                    if (location.state.value === 'foreign') {
                        onShowForeignMovie()
                    } else if (location.state.value === 'rus') {
                        onShowRussianMovie()
                    } else if (location.state.value === 'tjk') {
                        onShowTajikMovie()
                    }
                    break
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
        setSeries([])
        if (year.includes('2022')) {
            setYear(year.filter(item => item !== '2022'))
            setShowSeries2022(false)
        } else {
            setYear([...year, '2022'])
            setShowSeries2022(true)
        }
    }

    const onShowMovie2023 = () => {
        setSeries([])
        if (year.includes('2023')) {
            setYear(year.filter(item => item !== '2023'))
            setShowSeries2023(false)
        } else {
            setYear([...year, '2023'])
            setShowSeries2023(true)
        }
    }

    const onShowTajikMovie = () => {
        setSeries([])
        const tajikistan = countries.find(c => c.code.toLowerCase() === 'tjk')
        if (country.some(c => parseInt(c) == tajikistan?.id)) {
            setCountry(country.filter(c => parseInt(c) != tajikistan?.id))
            setShowTajik(false)
        } else {
            setCountry([...country, `${tajikistan?.id ?? ''}`])
            setShowTajik(true)
        }
    }

    const onShowRussianMovie = () => {
        setSeries([])
        const russia = countries.find(c => c.code.toLowerCase() === 'rus')
        if (country.some(c => parseInt(c) == russia?.id)) {
            setCountry(country.filter(c => parseInt(c) != russia?.id))
            setShowRussian(false)
        } else {
            setCountry([...country, `${russia?.id ?? ''}`])
            setShowRussian(true)
        }
    }

    const onShowForeignMovie = () => {
        setSeries([])
        if (country.includes('foreign')) {
            setCountry(country.filter(c => c != 'foreign'))
            setShowForeign(false)
        } else {
            setCountry([...country, 'foreign'])
            setShowForeign(true)
        }
    }

    useEffect(() => {
        const fetchSections = async () => {
            const data = await dispatch(getListSeries({page}))
            if (data.type.includes('fulfilled')) {
                setSeries(data.payload.data)
                setHasMore(data.payload.more)
            }
        }
        const fetchGenres = async () => {
            const data = await dispatch(getListGenres())
            if (data.type.includes('fulfilled')) {
                setGenres(data.payload.data)
            }
        }
        const fetchCountries = async () => {
            const data = await dispatch(getListCountries())
            if (data.type.includes('fulfilled')) {
                setCountries(data.payload.data)
                setFirstTime(false)
            }
        }
        fetchSections()
        fetchGenres()
        fetchCountries()
    }, [])

    useEffect(() => {
        const allGenres = genre.filter(g => !!g)
        const allCountries = country.filter(g => !!g)
        const allYears = year.filter(g => !!g)
        const fetchMovies = async (params: {
            genre?: boolean,
            country?: boolean,
            year?: boolean,
        }) => {
            let currentPage = page
            if (params.genre || params.country || params.year) {
                currentPage = 1
            }
            let requestData: {[key: string]: any} = {
                page: currentPage,
            }

            if (params.genre) {
                requestData['genres'] = allGenres
            }
            if (params.country) {
                requestData['countries'] = allCountries
            }
            if (params.year ) {
                requestData['years'] = allYears
            }

            setLoading(true)
            const response = await dispatch(getListSeries(requestData))
            setLoading(false)
            if (response.type.includes('fulfilled')) {
                setSeries((prevSeries) => [...prevSeries, ...response.payload.data.filter((newSeries: any) => !prevSeries.some(existingSeries => existingSeries.id === newSeries.id))])
                setHasMore(response.payload.more)
            }
        }

        fetchMovies({
            genre: allGenres.length > 0,
            country: allCountries.length > 0,
            year: allYears.length > 0,
        })
        const searchObj: any = {}
        if (allGenres.length > 0) {
            searchObj['genres'] = allGenres.join(',')
        }
        if (allCountries.length > 0) {
            searchObj['countries'] = allCountries.join(',')
        }
        if (allYears.length > 0) {
            searchObj['year'] = allYears.join(',')
        }

        setSearchParams(searchObj)
    }, [genre, country, free, year, page])

    const onHover = (id: number) => {
        setHovered(id)
    }

    const onUnHover = () => {
        setHovered(0)
    }

    const onPage = (item: Series) => {
        navigate(RoutesConfig.series_show.path.replace(':slug', `${item.slug}`))
    }

    const onGenreOptionSelect = (option: SelectedOption) => {
        setSeries([])
        setGenre([option.value])
    }

    const onGenreCheckboxSelect = (option: SelectedOption) => {
        setSeries([])
        if (genre.includes(option.value)) {
            setGenre(genre.filter(item => item !== 'all').filter(item => item !== option.value))
        } else {
            setGenre([...genre.filter(item => item !== 'all'), option.value])
        }
    }

    const onCountryOptionSelect = (option: SelectedOption) => {
        setSeries([])
        setCountry([option.value])
    }

    const onCountryCheckboxSelect = (option: SelectedOption) => {
        setSeries([])
        if (country.includes(option.value)) {
            setCountry(country.filter(item => item !== 'all').filter(item => item !== option.value))
        } else {
            setCountry([...country.filter(item => item !== 'all'), option.value])
        }
    }

    const onYearOptionSelect = (option: SelectedOption) => {
        setSeries([])
        setYear([option.value])
    }

    const onYearCheckboxSelect = (option: SelectedOption) => {
        setSeries([])
        if (year.includes(option.value)) {
            setYear(year.filter(item => item !== 'all').filter(item => item !== option.value))
        } else {
            setYear([...year.filter(item => item !== 'all'), option.value])
        }
    }

    const onFree = async () => {
        setSeries([])
        setFree(!free)
    }

    const onFreeEnter = () => {
        setHoveredFree(true)
    }

    const onFreeLeave = () => {
        setHoveredFree(false)
    }

    return (
        <div className={classes.mainPage} style={{minHeight: isFetchingSeries ? '100vh' : 'fit-content'}}>
            {isFetchingSeries && firstTime ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <div className={classes.pageWrapper}>
                        <h1 className={classes.pageTitle}>Сериалы смотреть онлайн</h1>
                        <div className={classes.filters}>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showForeign
                                })}
                                onClick={onShowForeignMovie}
                            >
                                Зарубежные сериалы
                            </div>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showRussian
                                })}
                                onClick={onShowRussianMovie}
                            >
                                Российские сериалы
                            </div>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showTajik
                                })}
                                onClick={onShowTajikMovie}
                            >
                                Таджикские сериалы
                            </div>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showSeries2023
                                })}
                                onClick={onShowMovie2023}
                            >
                                Сериалы 2023
                            </div>
                            <div
                                className={className(classes.badge, {
                                    [classes.activeBadge]: showSeries2022
                                })}
                                onClick={onShowMovie2022}
                            >
                                Сериалы 2022
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
                                onOptionSelect={onCountryOptionSelect}
                                onCheckboxSelect={onCountryCheckboxSelect}
                                value={country}
                                placeholder={'Страна'}
                                style={{width: '242px'}}
                                loading={isFetchingAllCountries}
                            >
                                <Option label={'Все'} value={'all'} />
                                {countries.length ? countries.map(country => (
                                    <CheckboxOption
                                        key={`country${country.id}`}
                                        label={country.name}
                                        value={country.id}
                                    />
                                )) : null}
                            </SelectContainer>
                            <SelectContainer
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
                        </div>
                        <div className={classes.sections}>
                            {series.map((item, index) => {
                                if (series.length === index + 1) {
                                    return (
                                        <div
                                            ref={lastMovieRef}
                                            onClick={() => onPage(item)}
                                            className={classes.section}
                                            key={item.id}
                                        >
                                            <img
                                                src={item.poster}
                                                alt="Poster"
                                                className={classes.contentImg}
                                                onMouseEnter={() => onHover(item.id)}
                                                onMouseLeave={onUnHover}
                                            />
                                            <button
                                                type={'button'}
                                                className={classes.playBtn}
                                                style={{opacity: hovered === item.id ? '1' : '0'}}
                                            >
                                                <Play className={classes.playIcon} />
                                            </button>
                                            <span
                                                className={classes.contentLabel}
                                                style={{opacity: hovered === item.id ? '1' : '0'}}
                                            >
                                        <span className={classes.contentName}>
                                            {item.name.length > 15 ? (
                                                <Marquee text={item.name} />
                                            ) : (
                                                item.name
                                            )}
                                        </span>
                                        <span className={classes.contentGenre}>/ {item.genres.map(genre => genre.name).join(', ')}</span>
                                    </span>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        onClick={() => onPage(item)}
                                        className={classes.section}
                                        key={item.id}
                                    >
                                        <ReactPlayer
                                            style={{
                                                transition: 'all .1s ease',
                                                cursor: 'pointer'
                                            }}
                                            width={'100%'}
                                            height={'100%'}
                                            url={item.trailer}
                                            controls={false}
                                            playing={false}
                                            onMouseEnter={() => onHover(item.id)}
                                            onMouseLeave={onUnHover}
                                        />
                                        <button
                                            type={'button'}
                                            className={classes.playBtn}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                            <Play className={classes.playIcon} />
                                        </button>
                                        <span
                                            className={classes.contentLabel}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                        <span className={classes.contentName}>
                                            {item.name.length > 15 ? (
                                                <Marquee text={item.name} />
                                            ) : (
                                                item.name
                                            )}
                                        </span>
                                        <span className={classes.contentGenre}>/ {item.genres.map(genre => genre.name).join(', ')}</span>
                                    </span>
                                    </div>
                                )
                            })}
                        </div>
                        {/*{isFetchingSeries ? (*/}
                        {/*    <Fetching className={classes.fetchingMore} />*/}
                        {/*) : null}*/}
                        {(loading || isFetchingSeries) ? (
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

export default SeriesListPage
