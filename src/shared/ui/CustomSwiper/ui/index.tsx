import classes from './index.module.css'
import React, {CSSProperties, useState} from "react";
import {Swiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import NextButton from "./NextButton"
import PrevButton from "./PrevButton";

interface SwiperProps extends React.PropsWithChildren{
    style?: CSSProperties
    views?: number
    nextSlideButton?: string
    previousSlideButton?: string
}

const CustomSwiper = (props: SwiperProps) => {
    const {style = {}, views = 3} = props
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const canNext = (): boolean => {
        if (React.isValidElement(props.children)) {
            return false;
        }

        //@ts-ignore
        const childrenCount = props.children?.length ?? 1;
        const totalGroups = Math.ceil(childrenCount / views);

        return currentIndex < totalGroups - 1;
    };

    return (
        <div className={classes.swiperContainer}>
            <Swiper
                spaceBetween={50}
                style={style}
                slidesPerView={views}
                modules={[Navigation]}
                onSlideChange={(swiper: any) => {
                    setCurrentIndex(swiper.activeIndex)
                }}
            >
                {props.children}

                {canNext() ? (
                    <NextButton cls={props.nextSlideButton} />
                ) : null}
                {/*{!isEnd ? (*/}
                {/*    <NextButton />*/}
                {/*) : null}*/}
                <PrevButton cls={props.previousSlideButton} />
            </Swiper>
        </div>
    )
}

export default CustomSwiper
