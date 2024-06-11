import React, {CSSProperties} from 'react'
import {className} from "src/shared/utils/className";
import classes from "./index.module.css"

export interface OptionProps {
    style?: CSSProperties
    cls?: string
    label: any
    value: any
    disabled?: boolean
}

const Option = (props: OptionProps) => {
    const {style = {}, cls = '', value, disabled = false} = props

    return (
        <div
            className={className(classes.option, {
                [classes.disabled]: disabled,
                [classes.active]: cls.includes('active'),
            }, [cls])}
            style={style}
            data-value={value}
        >
            {props.label}
        </div>
    )
}

export default Option
