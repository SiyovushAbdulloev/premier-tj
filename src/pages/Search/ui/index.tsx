import classes from './index.module.css'
import React, {useCallback, useEffect, useRef, useState} from "react";
import {ReactComponent as Back} from 'src/shared/assets/icons/back.svg'
import {SearchInput} from "src/shared/ui/SearchInput";
import {getAllPageSections, getIsFetchingAll, PageSection, PageSectionType} from "src/entities/PageSection";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {Media} from "src/entities/PageSection/types";
import {RoutesConfig} from "src/shared/config/routes";
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {SwiperSlide} from "swiper/react";
import ReactPlayer from "react-player";
import {getIsSearching, MediaContent, search} from "src/entities/MediaContent";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {useNavigate} from "react-router-dom";
import {className} from "src/shared/utils/className";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Series} from "src/entities/Series";

const SearchPage = () => {
    const isFetchingSections = useSelector(getIsFetchingAll)
    const [sections, setSections] = useState<Array<PageSection>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<{ section: string, name: string, id: number }>({
        section: '',
        name: '',
        id: 0
    })
    const [searchHovered, setSearchHovered] = useState<number>(0)
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const isSearching = useSelector(getIsSearching)
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
    const [movies, setMovies] = useState<Array<any>>([])
    const [searchString, setSearchString] = useState<string>('')

    useEffect(() => {
        const fetchSections = async () => {
            setLoading(true)
            const data = await dispatch(getAllPageSections({p: 'search', page}))
            setLoading(false)
            if (data.type.includes('fulfilled')) {
                setSections((prev) => [...prev, ...data.payload.data.filter((newSection: any) => !prev.some(existingSection => existingSection.id === newSection.id))])
                setHasMore(data.payload.hasMore)
            }
        }
        fetchSections()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            dispatch(search({page, q: searchString}))
                .then(response => {
                    setMovies((prevMovies) => [...prevMovies, ...response.payload.data])
                    setHasMore(response.payload.hasMore)
                })
        }
        if (page > 1 || searchString.length) {
            fetchData()
        }
    }, [page, searchString])

    const onSearchHover = (id: number) => {
        setSearchHovered(id)
    }

    const onSearchUnHover = () => {
        setSearchHovered(0)
    }

    const onHover = (id: number, section: string, name: string) => {
        setHovered({id, section, name})
    }

    const onUnHover = () => {
        setHovered({id: 0, section: '', name: ''})
    }

    const isHovered = (id: number, section: string, name: string): boolean => {
        if (hovered.section === section && hovered.id === id && hovered.name === name) {
            return true
        }
        return false
    }

    const onPage = (item: Media) => {
        switch (item.type) {
            case PageSectionType.MOVIE:
                navigate(RoutesConfig.movies_show.path.replace(':slug', `${item.data.slug}`))
                break
            case PageSectionType.MULTIMEDIA:
                navigate(RoutesConfig.multimedias_show.path.replace(':slug', `${item.data.slug}`))
                break
            case PageSectionType.SERIES:
                navigate(RoutesConfig.series_show.path.replace(':slug', `${item.data.slug}`))
                break
        }
    }

    const onSearchPage = (item: any) => {
        switch (item.type) {
            case 'movie':
                navigate(RoutesConfig.movies_show.path.replace(':slug', `${item.slug}`))
                break
            case 'multimedia':
                navigate(RoutesConfig.multimedias_show.path.replace(':slug', `${item.slug}`))
                break
            case 'series':
                navigate(RoutesConfig.series_show.path.replace(':slug', `${item.slug}`))
                break
        }
    }

    const back = () => {
        navigate(-1)
    }

    const onSearch = async (value: string) => {
        setSearchString(value)
    }
    console.log({movies})
    return (
        <div className={classes.search} style={{minHeight: '100vh'}}>
            <div className={classes.wrapper}>
                <header className={classes.header}>
                    <button className={classes.backBtn} onClick={back}>
                        <Back className={classes.backBtnIcon}/>
                        Назад
                    </button>
                    <SearchInput
                        placeholder={'Фильм, сериал'}
                        onChange={onSearch}
                        className={classes.input}
                    />
                </header>
                <div className={classes.items}>
                    {movies.length ? movies.map((item, index) => {
                        if (movies.length === index + 1) {
                            return (
                                <div
                                    key={item.type + item.id}
                                    onClick={() => onSearchPage(item)}
                                    className={classes.item}
                                    ref={lastMovieRef}
                                >
                                    <img
                                        src={item.poster}
                                        alt="Poster"
                                        className={classes.itemContentImg}
                                        onMouseEnter={() => onSearchHover(item.id)}
                                        onMouseLeave={onSearchUnHover}
                                    />
                                    {/*{!item.subscription_ids.length ? (*/}
                                    {/*    <div className={classes.freeLabel}>*/}
                                    {/*        Бесплатно*/}
                                    {/*    </div>*/}
                                    {/*) : null}*/}
                                    <button
                                        type={'button'}
                                        className={classes.itemPlayBtn}
                                        style={{opacity: searchHovered === item.id ? '1' : '0'}}
                                    >
                                        <Play className={classes.itemPlayIcon}/>
                                    </button>
                                    <span
                                        className={className(classes.itemContentLabel, null, [classes.marquee])}
                                        style={{opacity: searchHovered === item.id ? '1' : '0'}}
                                    >
                                        <span className={classes.child}>
                                            <span className={classes.itemContentName}>
                                                {item.name} / {item.genres.map((genre: any) => genre.name).join(', ')}
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            )
                        }
                        return (
                            <div
                                key={item.type + item.id}
                                onClick={() => onSearchPage(item)}
                                className={classes.item}
                            >
                                <img
                                    src={item.poster}
                                    alt="Poster"
                                    className={classes.itemContentImg}
                                    onMouseEnter={() => onSearchHover(item.id)}
                                    onMouseLeave={onSearchUnHover}
                                />
                                {/*{!item.subscription_ids.length ? (*/}
                                {/*    <div className={classes.freeLabel}>*/}
                                {/*        Бесплатно*/}
                                {/*    </div>*/}
                                {/*) : null}*/}
                                <button
                                    type={'button'}
                                    className={classes.itemPlayBtn}
                                    style={{opacity: searchHovered === item.id ? '1' : '0'}}
                                >
                                    <Play className={classes.itemPlayIcon}/>
                                </button>
                                <span
                                    className={className(classes.itemContentLabel, null, [classes.marquee])}
                                    style={{opacity: searchHovered === item.id ? '1' : '0'}}
                                >
                                    <span className={classes.child}>
                                        <span className={classes.itemContentName}>
                                            {item.name} / {item.genres.map((genre: any) => genre.name).join(', ')}
                                        </span>
                                    </span>
                                </span>
                            </div>
                        )
                    }) : null}
                </div>
                {(loading || isSearching) ? (
                    <div className={classes.items}>
                        {Array.from(Array(8).keys()).map(index => {
                            return (
                                <div
                                    key={index}
                                    className={className(classes.item, null, [classes.skeleton])}
                                >
                                    <Skeleton height={'100%'} width={'100%'}/>
                                </div>
                            )
                        })}
                    </div>
                ) : null}
            </div>
            <div className={classes.sections}>
                {sections.map((section: PageSection, index: number) => {
                    if (index === (sections.length - 1)) {
                        return (
                            <div
                                key={section.id}
                                className={classes.section}
                                ref={lastMovieRef}
                            >
                                <h2 className={classes.sectionTitle}>{section.label}</h2>
                                <div className={classes.sectionItems}>
                                    <CustomSwiper views={2} style={{height: '100%'}}>
                                        {section.media.map((item, index) => {
                                            return (
                                                (
                                                    <SwiperSlide
                                                        key={`${section.id}${index}`}
                                                        className={classes.slide}
                                                    >
                                                        <div
                                                            onClick={() => onPage(item)}
                                                            className={classes.content}>
                                                            {(item.type === 'movie') ? (
                                                                <img
                                                                    src={item.data.poster}
                                                                    alt=""
                                                                    className={classes.contentImg}
                                                                    onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                    onMouseLeave={onUnHover}
                                                                />
                                                            ) : null}
                                                            {(item.type === 'multimedia') ? (
                                                                (
                                                                    <ReactPlayer
                                                                        style={{
                                                                            transition: 'all .1s ease',
                                                                            transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                        }}
                                                                        width={345}
                                                                        height={204}
                                                                        url={(item.data as MediaContent).file}
                                                                        controls={false}
                                                                        playing={false}
                                                                        onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                        onMouseLeave={onUnHover}
                                                                    />
                                                                )
                                                            ) : null}
                                                            {(item.type === 'series') ? (
                                                                (
                                                                    <ReactPlayer
                                                                        style={{
                                                                            transition: 'all .1s ease',
                                                                            transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                        }}
                                                                        width={345}
                                                                        height={204}
                                                                        url={item.data.trailer}
                                                                        controls={false}
                                                                        playing={false}
                                                                        onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                        onMouseLeave={onUnHover}
                                                                    />
                                                                )
                                                            ) : null}
                                                            <button
                                                                type={'button'}
                                                                className={classes.playBtn}
                                                                style={{opacity: isHovered(item.data.id, section.label, item.data.name) ? '1' : '0'}}
                                                            >
                                                                <Play className={classes.playIcon}/>
                                                            </button>
                                                            <span
                                                                className={className(classes.itemContentLabel, null, [classes.marquee])}
                                                                style={{opacity: isHovered(item.data.id, section.label, item.data.name) ? '1' : '0'}}
                                                            >
                                                                <span className={classes.child}>
                                                                    <span className={classes.itemContentName}>
                                                                        {item.data.name} / {item.data.genres.map(genre => genre.name).join(', ')}
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            )
                                        })}
                                    </CustomSwiper>
                                </div>
                                {section.ad_url ? (
                                    <img
                                        src={section.ad_url}
                                        alt="Ad"
                                        className={classes.adImage}
                                    />
                                ) : null}
                            </div>
                        )
                    }
                    return (
                        <div
                            key={section.id}
                            className={classes.section}
                        >
                            <h2 className={classes.sectionTitle}>{section.label}</h2>
                            <div className={classes.sectionItems}>
                                <CustomSwiper views={2} style={{height: '100%'}}>
                                    {section.media.map((item, index) => {
                                        return (
                                            (
                                                <SwiperSlide
                                                    key={`${section.id}${index}`}
                                                    className={classes.slide}
                                                >
                                                    <div
                                                        onClick={() => onPage(item)}
                                                        className={classes.content}>
                                                        {(item.type === 'movie') ? (
                                                            <img
                                                                src={item.data.poster}
                                                                alt=""
                                                                className={classes.contentImg}
                                                                onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                onMouseLeave={onUnHover}
                                                            />
                                                        ) : null}
                                                        {(item.type === 'multimedia') ? (
                                                            (
                                                                <ReactPlayer
                                                                    style={{
                                                                        transition: 'all .1s ease',
                                                                        transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                    }}
                                                                    width={345}
                                                                    height={204}
                                                                    url={(item.data as MediaContent).file}
                                                                    controls={false}
                                                                    playing={false}
                                                                    onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                    onMouseLeave={onUnHover}
                                                                />
                                                            )
                                                        ) : null}
                                                        {(item.type === 'series') ? (
                                                            (
                                                                <ReactPlayer
                                                                    style={{
                                                                        transition: 'all .1s ease',
                                                                        transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                    }}
                                                                    width={345}
                                                                    height={204}
                                                                    url={item.data.trailer}
                                                                    controls={false}
                                                                    playing={false}
                                                                    onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                    onMouseLeave={onUnHover}
                                                                />
                                                            )
                                                        ) : null}
                                                        <button
                                                            type={'button'}
                                                            className={classes.playBtn}
                                                            style={{opacity: isHovered(item.data.id, section.label, item.data.name) ? '1' : '0'}}
                                                        >
                                                            <Play className={classes.playIcon}/>
                                                        </button>
                                                        <span
                                                            className={className(classes.itemContentLabel, null, [classes.marquee])}
                                                            style={{opacity: isHovered(item.data.id, section.label, item.data.name) ? '1' : '0'}}
                                                        >
                                                            <span className={classes.child}>
                                                                <span className={classes.itemContentName}>
                                                                    {item.data.name} / {item.data.genres.map(genre => genre.name).join(', ')}
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        )
                                    })}
                                </CustomSwiper>
                            </div>
                            {section.ad_url ? (
                                <img
                                    src={section.ad_url}
                                    alt="Ad"
                                    className={classes.adImage}
                                />
                            ) : null}
                        </div>
                    )
                })}
            </div>
            {isFetchingSections ? (
                <div className={classes.sections}>
                    {Array.from(Array(5).keys()).map(index => {
                        return (
                            <div
                                key={index}
                                className={className(classes.section, null, [classes.sectionItems])}
                            >
                                <Skeleton containerClassName={classes.sectionItems} height={'100%'}/>
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}

export default SearchPage
