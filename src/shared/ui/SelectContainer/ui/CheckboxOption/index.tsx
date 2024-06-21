import React, {useRef, useState} from 'react';
import { className } from "src/shared/utils/className";
import classes from "./index.module.css";
import {SelectedOption} from "../index";

export interface OptionProps {
    style?: React.CSSProperties;
    cls?: string;
    label: any;
    value: any;
    disabled?: boolean;
    onClick?: (option: SelectedOption) => void
}

const CheckboxOption = (props: OptionProps) => {
    const { style = {}, cls = '', value, label, disabled = false } = props;
    const [hovered, setHovered] = useState<boolean>(false);
    const optionRef = useRef<HTMLDivElement | null>(null)

    const onEnter = () => {
        setHovered(true);
    };

    const onLeave = () => {
        setHovered(false);
    };

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (optionRef.current) {
            e.stopPropagation()
            optionRef.current?.click()
        }
        if (props.onClick) {
            props.onClick({
                label,
                value,
            })
        }
    };

    return (
        <div
            className={className(classes.option, { [classes.disabled]: disabled }, [cls])}
            style={style}
            data-value={value}
            data-option-type={'checkbox'}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            ref={optionRef}
        >
            <div
                className={className(classes.checkbox, {
                    [classes.activeCheckbox]: cls.includes('active'),
                    [classes.hoveredCheckbox]: hovered,
                })}
                onClick={onClick}
            >
                <svg
                    width={18}
                    height={18}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
            {props.label}
        </div>
    );
};

export default CheckboxOption;
