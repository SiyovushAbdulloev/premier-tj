import classes from './index.module.css'
import {SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useState} from "react";
import {
    getAllMainPageSections,
    getIsFetchingAll,
    MainPageSection,
    MainPageSectionType
} from "src/entities/MainPageSection";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {Media} from "src/entities/MainPageSection/types";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import ReactPlayer from "react-player";
import {MediaContent} from "src/entities/MediaContent";

const MainPage = () => {
    const navigate = useNavigate()
    const isFetchingSections = useSelector(getIsFetchingAll)
    const [sections, setSections] = useState<Array<MainPageSection>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<{section: string, name: string, id: number}>({
        section: '',
        name: '',
        id: 0
    })

    useEffect(() => {
        const fetchSections = async () => {
            const data = await dispatch(getAllMainPageSections())
            if (data.type.includes('fulfilled')) {
                console.log({data})
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
            case MainPageSectionType.MOVIE:
                navigate(RoutesConfig.movies_show.path.replace(':id', `${item.data.id}`))
                break
            case MainPageSectionType.MULTIMEDIA:
                break
            case MainPageSectionType.SERIES:
                navigate(RoutesConfig.series_show.path.replace(':id', `${item.data.id}`))
                break
        }
    }

    return (
        <div className={classes.mainPage} style={{height: isFetchingSections ? '700px' : 'fit-content'}}>
            {isFetchingSections ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <CustomSwiper views={1.3} style={{height: '521px'}}>
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
                        {sections.map((section: MainPageSection) => (
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
                                                                <Play className={classes.playIcon} />
                                                            </button>
                                                            <span
                                                                className={classes.contentLabel}
                                                                style={{opacity: isHovered(item.data.id, section.label, item.data.name) ? '1' : '0'}}
                                                            >
                                                        <span className={classes.contentName}>{item.data.name}</span>
                                                        <span className={classes.contentGenre}>/ {item.data.genres.map(genre => genre.name).join(',')}</span>
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

export default MainPage
