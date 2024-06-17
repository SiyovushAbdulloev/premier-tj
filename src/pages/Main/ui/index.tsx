import classes from './index.module.css'
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {CustomSwiper} from "src/shared/ui/CustomSwiper";
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {getAllMainPageSections, getIsFetchingAll, MainPageSection} from "src/entities/MainPageSection";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"

const MainPage = () => {
    const isFetchingSections = useSelector(getIsFetchingAll)
    const [sections, setSections] = useState<Array<MainPageSection>>([])
    const dispatch = useAppDispatch()

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
    return (
        <div className={classes.mainPage} style={{height: isFetchingSections ? '700px' : 'fit-content'}}>
            {isFetchingSections ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <CustomSwiper style={{height: '500px'}}>
                        <SwiperSlide style={{width: '700px'}}>Slide 1</SwiperSlide>
                        <SwiperSlide style={{width: '700px'}}>Slide 2</SwiperSlide>
                        <SwiperSlide style={{width: '700px'}}>Slide 3</SwiperSlide>
                        <SwiperSlide style={{width: '700px'}}>Slide 4</SwiperSlide>
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
                                        {section.media.map((item, index) => (
                                            <SwiperSlide
                                                key={`${section.id}${index}`}
                                                className={classes.slide}
                                            >
                                                <div className={classes.content}>

                                                </div>
                                            </SwiperSlide>
                                        ))}
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
