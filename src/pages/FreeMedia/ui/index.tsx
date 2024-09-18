import classes from './index.module.css'
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useState} from "react";
import {
    getAllPageSections,
    getIsFetchingAll,
    PageSection,
    PageSectionType
} from "src/entities/PageSection";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {Media} from "src/entities/PageSection/types";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import ReactPlayer from "react-player";
import {MediaContent} from "src/entities/MediaContent";
import {className} from "src/shared/utils/className";

const FreeMediaPage = () => {
    const navigate = useNavigate()
    const isFetchingSections = useSelector(getIsFetchingAll)
    const [sections, setSections] = useState<Array<PageSection>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<{ section: string, name: string, id: number }>({
        section: '',
        name: '',
        id: 0
    })

    useEffect(() => {
        const fetchSections = async () => {
            const data = await dispatch(getAllPageSections('free'))
            if (data.type.includes('fulfilled')) {
                setSections(data.payload)
            }
        }
        fetchSections()
    }, [])

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
        <div className={classes.mainPage} style={{height: isFetchingSections ? '700px' : 'fit-content'}}>
            {isFetchingSections ? (
                <Fetching className={classes.fetching}/>
            ) : (
                <>
                    <div className={classes.sections}>
                        {sections.map((section: PageSection) => (
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
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default FreeMediaPage
