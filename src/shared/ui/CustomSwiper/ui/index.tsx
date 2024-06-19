import classes from './index.module.css'
import React, {CSSProperties, useRef} from "react";
import {Swiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import NextButton from "./NextButton"
import PrevButton from "./PrevButton";

interface SwiperProps extends React.PropsWithChildren{
    style?: CSSProperties
    views?: number
}

const CustomSwiper = (props: SwiperProps) => {
    const {style = {}, views = 3} = props
    const swiperRef = useRef<any>()

    return (
        <div className={classes.swiperContainer}>
            <Swiper
                ref={swiperRef}
                spaceBetween={50}
                style={style}
                slidesPerView={views}
                modules={[Navigation]}
            >
                {props.children}

                <NextButton />
                <PrevButton />
            </Swiper>
        </div>
    )
}

export default CustomSwiper
