import classes from './index.module.css'
import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {className} from "src/shared/utils/className";
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import NextButton from "./NextButton"
import PrevButton from "./PrevButton";

interface SwiperProps extends React.PropsWithChildren{
    style?: CSSProperties
    views?: number
}

const CustomSwiper = (props: SwiperProps) => {
    const {style = {}, views = 3} = props
    const swiper = useSwiper()
    const swiperRef = useRef<any>()

    return (
        <div className={classes.swiperContainer}>
            <Swiper
                ref={swiperRef}
                spaceBetween={50}
                style={style}
                slidesPerView={views}
                modules={[Navigation]}
                // pagination={{
                //     el: '.swiper-pagination',
                //     clickable: true,
                // }}
            >
                {props.children}

                <NextButton />
                <PrevButton />
                {/*<div className="swiper-pagination"></div>*/}
            </Swiper>
        </div>
    )
}

export default CustomSwiper
