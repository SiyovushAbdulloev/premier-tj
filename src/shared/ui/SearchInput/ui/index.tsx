"use client"
import React, {MutableRefObject, useRef, useState} from 'react'
import classes from "./index.module.css"
import {className} from "src/shared/utils/className";
import {useOutsideClick} from "src/shared/hooks/useClickOutside";
import {ReactComponent as Search} from 'src/shared/assets/icons/search.svg'

interface SearchInputProps {
    className?: string
    placeholder?: string
    style?: any
    onChange?: (value: string) => void
    id?: string
}

const SearchInput = React.forwardRef((props: SearchInputProps, ref: React.ForwardedRef<string>) => {
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
    }

    return (
        <div
            className={className(classes.input, {
                [classes.active]: active
            })}
            style={props.style}
            ref={inputDivRef}
            onClick={inputClicked}
        >
            <Search className={classes.search} />
            <input
                id={props.id ?? ''}
                className={className(classes.inputElement, {
                    [classes.inputElementActive]: active
                })}
                value={value ?? ''}
                placeholder={props.placeholder}
                ref={inputRef}
                type="text"
                onChange={inputChanged}
                onClick={inputClicked}
                autoFocus={active}
            />
        </div>
    )
})

SearchInput.displayName = "SearchInput"

export default SearchInput
