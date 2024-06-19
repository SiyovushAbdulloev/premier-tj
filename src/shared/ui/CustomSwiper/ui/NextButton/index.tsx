import React, {CSSProperties} from "react";
import {useSwiper} from "swiper/react";
import classes from './index.module.css'
import {ReactComponent as ChevronRight} from "src/shared/assets/icons/chevron_right.svg";
import {className} from "src/shared/utils/className";

interface Props extends React.PropsWithChildren {
    style?: CSSProperties
    cls?: string
}

const NextButton = (props: Props) => {
    const {style = {}} = props
    const swiper = useSwiper()

    return (
        <button
            className={className(classes.btn, undefined, [props.cls ?? ''])}
            style={style}
            type={'button'}
            onClick={() => swiper.slideNext()}
        >
            <ChevronRight className={classes.icon} />
        </button>
    )
}

export default NextButton
