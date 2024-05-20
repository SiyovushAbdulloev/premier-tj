"use client"
import React, {MutableRefObject, useRef, useState} from 'react'
import classes from "./index.module.css"
import {className} from "src/shared/utils/className";
import {useOutsideClick} from "src/shared/hooks/useClickOutside";

interface InputProps {
    className?: string
    placeholder?: string
    style?: any
    onChange?: (value: string) => void
    disabled?: boolean
    clearable?: boolean
    id?: string
}

const Input = React.forwardRef((props: InputProps, ref: React.ForwardedRef<string>) => {
    const [value, setValue] = useState<string|undefined|null>((ref as MutableRefObject<string>)?.current)
    const [active, setActive] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const inputDivRef = useOutsideClick(() => {
        setActive(false)
    })

    const inputClicked = () => {
        setActive(true)
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (props.onChange) {
            props.onChange(e.target.value)
        }
        if (ref) {
            //@ts-ignore
            ref.current = e.target.value
        }
    }

    const clearClicked = () => {
        setValue('')
        if (inputRef.current) {
            inputRef.current.focus()
            inputRef.current.value = ''
        }
        if (props.onChange) {
            props.onChange('')
        }
    }

    return (
        <div
            className={className(classes.input, {
                [classes.active]: active,
                [classes.disabled]: props.disabled,
                [classes.clearable]: props.clearable,
            })}
            style={props.style}
            ref={inputDivRef}
            onClick={inputClicked}
        >
            <input
                id={props.id ?? ''}
                className={className(classes.inputElement, {
                    [classes.inputElementActive]: active
                })}
                value={value ?? ''}
                placeholder={props.placeholder}
                disabled={props.disabled}
                ref={inputRef}
                type="text"
                onChange={inputChanged}
                onClick={inputClicked}
                autoFocus={active}
            />
            {props.clearable && (value?.length ?? 0) > 0 ? (
                <button
                    onClick={clearClicked}
                    type="button"
                    className={classes.clear}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={'16px'} height={'16px'} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            ) : null}
        </div>
    )
})

Input.displayName = "Input"

export default Input
