import classes from './index.module.css'
import React, {CSSProperties, forwardRef} from "react";
import {Input} from "src/shared/ui/Input";

interface TextFieldProps {
    label?: string
    placeholder?: string
    id: string
    style?: CSSProperties
}

const TextField = forwardRef((props: TextFieldProps, ref: React.ForwardedRef<string>) => {
    const {label = '', placeholder = '', id, style = {}} = props

    const onChange = (value: string) => {
        // @ts-ignore
        ref.current = value
    }

    return (
        <div className={classes.textField} style={style}>
            <label htmlFor={id}>{label}</label>
            <Input
                ref={ref}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
})

TextField.displayName = 'TextField'

export default TextField
