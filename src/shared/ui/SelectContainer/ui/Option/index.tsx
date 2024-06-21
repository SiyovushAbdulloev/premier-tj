import React, {CSSProperties, useRef, useState} from 'react'
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
    const [hovered, setHovered] = useState<boolean>(false)
    const optionRef = useRef<HTMLDivElement | null>(null)

    const onEnter = () => {
        setHovered(true)
    }

    const onLeave = () => {
        setHovered(false)
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (optionRef.current) {
            e.stopPropagation()
            optionRef.current?.click()
        }
    };

    return (
        <div
            className={className(classes.option, {[classes.disabled]: disabled}, [cls])}
            style={style}
            data-value={value}
            data-option-type={'option'}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            ref={optionRef}
        >
            <div
                className={className(classes.radio, {
                    [classes.activeRadio]: cls.includes('active')
                })}
                onClick={onClick}
            >
                <div className={className(classes.radioChild, {
                    [classes.activeRadioChild]: cls.includes('active')
                    })}></div>
                </div>
                {props.label}
            </div>
    )
}

export default Option
