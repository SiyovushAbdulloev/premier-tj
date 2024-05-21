import classes from './index.module.css'
import React, {CSSProperties, forwardRef} from "react";
import {Input} from "src/shared/ui/Input";

interface TextFieldProps {
    label?: string
    placeholder?: string
    id: string
    style?: CSSProperties
    onChange: (value: string) => void
    value: string
}

const TextField = (props: TextFieldProps) => {
    const {label = '', placeholder = '', id, style = {}} = props

    const onChange = (value: string) => {
        props.onChange(value)
    }

    return (
        <div className={classes.textField} style={style}>
            <label htmlFor={id}>{label}</label>
            <Input
                value={props.value}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default TextField
