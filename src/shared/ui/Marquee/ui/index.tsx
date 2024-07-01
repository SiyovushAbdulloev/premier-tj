import classes from './index.module.css'
import React from "react";

interface MarqueeProps {
    text: string
}

const Marquee = (props: MarqueeProps) => {

    return (
        <span className={classes.marquee}>
            <span className={classes.child}>
                {props.text}
            </span>
        </span>
    )
}

export default Marquee
