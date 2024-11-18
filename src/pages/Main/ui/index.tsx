import classes from './index.module.css'
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    getAllPageSections,
    getIsFetchingAll,
    PageSection,
    PageSectionType
} from "src/entities/PageSection";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {Media} from "src/entities/PageSection/types";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import ReactPlayer from "react-player";
import {MediaContent} from "src/entities/MediaContent";
import {className} from "src/shared/utils/className";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const MainPage = () => {
    const navigate = useNavigate()
    const isFetchingSections = useSelector(getIsFetchingAll)
    const [sections, setSections] = useState<Array<PageSection>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<{ section: string, name: string, id: number }>({
        section: '',
        name: '',
        id: 0
    })
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const observerRef = useRef<IntersectionObserver | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const lastSectionRef = useCallback((node: HTMLDivElement) => {
        if (loading) return
        if (observerRef.current) observerRef.current?.disconnect()
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prev) => prev + 1)
            }
        })
        if (node) observerRef.current?.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        const fetchSections = async () => {
            setLoading(true)
            const data = await dispatch(getAllPageSections({p: 'main', page}))
            setLoading(false)
            if (data.type.includes('fulfilled')) {
                setSections((prev) => [...prev, ...data.payload.data.filter((newSection: any) => !prev.some(existingSection => existingSection.id === newSection.id))])
                setHasMore(data.payload.hasMore)
            }
        }
        fetchSections()
    }, [page])

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

    return (
        <div className={classes.mainPage} style={{minHeight: isFetchingSections ? '100vh' : 'fit-content'}}>
            <CustomSwiper
                views={1.3}
                style={{height: '521px'}}
                nextSlideButton={classes.nextSlide}
                previousSlideButton={classes.previousSlide}
            >
                <SwiperSlide className={classes.mainSlide}>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=W5V1FFU1YiI'}
                        controls={false}
                        playing={false}
                    />
                </SwiperSlide>
                <SwiperSlide className={classes.mainSlide}>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=W5V1FFU1YiI'}
                        controls={false}
                        playing={false}
                    />
                </SwiperSlide>
                <SwiperSlide className={classes.mainSlide}>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=W5V1FFU1YiI'}
                        controls={false}
                        playing={false}
                    />
                </SwiperSlide>
                <SwiperSlide className={classes.mainSlide}>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=W5V1FFU1YiI'}
                        controls={false}
                        playing={false}
                    />
                </SwiperSlide>
                <SwiperSlide className={classes.mainSlide}>
                    <ReactPlayer
                        width={'100%'}
                        height={'100%'}
                        url={'https://www.youtube.com/watch?v=W5V1FFU1YiI'}
                        controls={false}
                        playing={false}
                    />
                </SwiperSlide>
            </CustomSwiper>
            <div className={classes.sections}>
                {sections.map((section: PageSection, index: number) => {
                    if (index === (sections.length - 1)) {
                        return (
                            (
                                <div
                                    key={section.id}
                                    className={classes.section}
                                    ref={lastSectionRef}
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
                                                                        <video src=""></video>
                                                                        // <ReactPlayer
                                                                        //     style={{
                                                                        //         transition: 'all .1s ease',
                                                                        //         transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                        //     }}
                                                                        //     width={345}
                                                                        //     height={204}
                                                                        //     url={(item.data as MediaContent).file}
                                                                        //     controls={false}
                                                                        //     playing={false}
                                                                        //     onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                        //     onMouseLeave={onUnHover}
                                                                        // />
                                                                    )
                                                                ) : null}
                                                                {(item.type === 'series') ? (
                                                                    (
                                                                        <video src=""></video>
                                                                        // <ReactPlayer
                                                                        //     style={{
                                                                        //         transition: 'all .1s ease',
                                                                        //         transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''
                                                                        //     }}
                                                                        //     width={345}
                                                                        //     height={204}
                                                                        //     url={item.data.trailer}
                                                                        //     controls={false}
                                                                        //     playing={false}
                                                                        //     onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                        //     onMouseLeave={onUnHover}
                                                                        // />
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
                        )
                    }
                    return (
                        (
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
                                                            {/*{(item.type === 'movie') ? (*/}
                                                                <img
                                                                    src={item.data.poster}
                                                                    alt=""
                                                                    className={classes.contentImg}
                                                                    onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}
                                                                    onMouseLeave={onUnHover}
                                                                />
                                                            {/*{(item.type === 'multimedia') ? (*/}
                                                            {/*    (*/}
                                                            {/*        <ReactPlayer*/}
                                                            {/*            style={{*/}
                                                            {/*                transition: 'all .1s ease',*/}
                                                            {/*                transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''*/}
                                                            {/*            }}*/}
                                                            {/*            width={345}*/}
                                                            {/*            height={204}*/}
                                                            {/*            url={(item.data as MediaContent).file}*/}
                                                            {/*            controls={false}*/}
                                                            {/*            playing={false}*/}
                                                            {/*            onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}*/}
                                                            {/*            onMouseLeave={onUnHover}*/}
                                                            {/*        />*/}
                                                            {/*    )*/}
                                                            {/*) : null}*/}
                                                            {/*{(item.type === 'series') ? (*/}
                                                            {/*    (*/}
                                                            {/*        <ReactPlayer*/}
                                                            {/*            style={{*/}
                                                            {/*                transition: 'all .1s ease',*/}
                                                            {/*                transform: isHovered(item.data.id, section.label, item.data.name) ? 'scale(105%)' : ''*/}
                                                            {/*            }}*/}
                                                            {/*            width={345}*/}
                                                            {/*            height={204}*/}
                                                            {/*            url={item.data.trailer}*/}
                                                            {/*            controls={false}*/}
                                                            {/*            playing={false}*/}
                                                            {/*            onMouseEnter={() => onHover(item.data.id, section.label, item.data.name)}*/}
                                                            {/*            onMouseLeave={onUnHover}*/}
                                                            {/*        />*/}
                                                            {/*    )*/}
                                                            {/*) : null}*/}
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

export default MainPage
