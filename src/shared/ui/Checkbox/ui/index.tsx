import classes from './index.module.css'
import React, {useState} from "react";
import {className} from "src/shared/utils/className";

interface Props {
    label: string
    value: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ label, value = false, onChange, ...props }: Props) => {
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <label className={classes.wrapper}>
            <input
                className={className(classes.input, {[classes.active]: value})}
                {...props}
                type="checkbox"
                checked={value}
                onChange={onInputChange}
            />
            <span className={classes.label}>{label}</span>
        </label>
    );
};
export default Checkbox;
