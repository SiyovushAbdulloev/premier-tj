import React, {CSSProperties, ReactNode, useCallback, useEffect, useRef, useState} from 'react'
import {className} from "src/shared/utils/className";
import {useOutsideClick} from "src/shared/hooks/useClickOutside";
import classes from './index.module.css'
import {ReactComponent as ArrowDown} from 'src/shared/assets/icons/arrow_down_select.svg'
import {isArray} from "src/shared/utils/isArray";

interface SelectProps extends React.PropsWithChildren{
    style?: CSSProperties
    onOptionSelect: (option: SelectedOption) => void
    onCheckboxSelect: (option: SelectedOption) => void
    duration?: number
    placeholder?: string
    disabled?: boolean
    height?: number | null
    value: any
    chosenValues?: Array<any>
    loading?: boolean
    cls?: string
}

export interface SelectedOption {
    value: any
    label: string
}

const SelectContainer = (props: SelectProps) =>  {
    const [children, setChildren] = useState(props.children)
    const [activeOptions, setActiveOptions] = useState<Array<any>>(props.value)

    useEffect(() => {
        setActiveOptions(props.value)
    }, [props.value])

    const activeOptionLabel = (function (): string {
        if (activeOptions.length) {
            // @ts-ignore
            const childs = children.filter((child: any) => !!child)
            if (isArray(childs)) {
                // @ts-ignore
                if (childs.length === 0) {
                    return ''
                }
            }
            if (React.isValidElement(childs)) {
                // @ts-ignore
                return childs.props.label
            }
            //@ts-ignore
            if (childs && childs.length) {
                // @ts-ignore
                let data: Array<string> = ['']

                for(let i = 0; i < childs.length; i++) {
                    if (isArray(childs[i])) {
                        for (let j = 0; j < childs[i].length; j++) {
                            if (activeOptions.some(option => option == childs[i][j].props.value)) {
                                data = [...data, childs[i][j].props.label]
                            }
                        }
                    } else {
                        if (activeOptions.some(option => option == childs[i].props.value)) {
                            data = [...data, childs[i].props.label]
                        }
                    }
                }

                if (data.length) {
                    return data.filter(label => !!label).join(',')
                }
                return ''
            }
            return ''
        } else {
            return ''
        }
    })()
    const [clicked, setClicked] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const duration = props.duration ?? .1
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            setWindowWidth(window.innerWidth)
        } else {
            if (dropdownRef.current) {
                const dropdownRect = dropdownRef.current.getBoundingClientRect();

                if (dropdownRect.right > windowWidth) {
                    dropdownRef.current.style.left = `${windowWidth - dropdownRect.right - 20}px`
                }
            }
        }
    }, [isOpen])

    const getModifiedChildren = useCallback(() => {
        let item: ReactNode
        let items: Array<any> = []
        if (React.isValidElement(children)) {
            const ch: ReactNode = {...children}
            // @ts-ignore
            item = {...ch}
            // @ts-ignore
            if (activeOptions.some(option => option == ch?.props?.value)) {
                // @ts-ignore
                const props = {...ch.props}
                if ('cls' in props) {
                    props['cls'] = props['cls'] + ' active'
                } else {
                    props['cls'] = 'active'
                }
                // @ts-ignore
                ch.props = props
            }
            items = [ch]
        } else {
            //@ts-ignore
            for (let i = 0; i < children.length; i++) {
                //@ts-ignore
                if (React.isValidElement(children[i])) {
                    //@ts-ignore
                    const ch: ReactNode = {...children[i]}

                    if (i === 0) {
                        // @ts-ignore
                        item = {...ch}
                    }
                    // @ts-ignore
                    if (activeOptions.some(option => option == ch?.props?.value)) {
                        // @ts-ignore
                        const props = {...ch.props}
                        if ('cls' in props) {
                            props['cls'] = props['cls'] + ' active'
                        } else {
                            props['cls'] = 'active'
                        }
                        // @ts-ignore
                        ch.props = props
                    }
                    // @ts-ignore
                    items = [...items, ch]
                    //@ts-ignore
                } else if (isArray(children[i])) {
                    //@ts-ignore
                    for (let j = 0; j < children[i].length; j++) {
                        //@ts-ignore
                        const ch: ReactNode = {...children[i][j]}

                        if (i === 0) {
                            // @ts-ignore
                            item = {...ch}
                        }
                        // @ts-ignore
                        if (activeOptions.some(option => option == ch?.props?.value)) {
                            // @ts-ignore
                            const props = {...ch.props}
                            if ('cls' in props) {
                                props['cls'] = props['cls'] + ' active'
                            } else {
                                props['cls'] = 'active'
                            }
                            // @ts-ignore
                            ch.props = props
                        }
                        // @ts-ignore
                        items = [...items, ch]
                    }
                }
            }
        }

        //@ts-ignore
        return items.filter(item => {
            if (item) {
                //@ts-ignore
                if (item.props.value === '') {
                    return true
                }
                //@ts-ignore
                if (!props.chosenValues?.some(value => value == item.props.value)) {
                    return true
                }
                return false
            }
            return false
        })
    }, [activeOptions, children, props.chosenValues])

    const selectClicked = () => {
        if (!props.disabled && !props.loading) {
            setIsOpen(!isOpen)
            setClicked(!clicked)
        }
    }

    const selectRef = useOutsideClick(() => {
        setIsOpen(false)
        setClicked(false)
    })

    const optionClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        // @ts-ignore
        const value = e.target.getAttribute('data-value')

        if (value !== undefined) {
            if (value === 'all') {
                setActiveOptions([value])
            } else {
                if (activeOptions.some(option => option == value)) {
                    setActiveOptions(activeOptions.filter(option => option !== value).filter(option => option !== 'all'))
                } else {
                    setActiveOptions([...activeOptions, value].filter(option => option !== 'all'))
                }
            }
            setIsOpen(false)
            setClicked(false)
            let data
            // @ts-ignore
            const type = e.target.getAttribute('data-option-type')
            if (React.isValidElement(children)) {
                    data = {
                        // @ts-ignore
                        value: children.props.value,
                        // @ts-ignore
                        label: children.props.label,
                    }
            } else {
                let item: any
                // @ts-ignore
                for (let i = 0; i < children.length; i++) {
                    // @ts-ignore
                    if (React.isValidElement(children[i])) {
                        // @ts-ignore
                        if (children[i].props.value === value) {
                            // @ts-ignore
                            item = children[i]
                        }
                        // @ts-ignore
                    } else if (isArray(children[i])) {
                        // @ts-ignore
                        for (let j = 0; j < children[i].length; j++) {
                            // @ts-ignore
                            if (children[i][j].props.value == value) {
                                // @ts-ignore
                                item = children[i][j]
                            }
                        }
                    }
                }

                data = {
                    value: item.props.value,
                    label: item.props.label,
                }
            }
            if (type === 'option') {
                props.onOptionSelect(data)
            } else if (type === 'checkbox') {
                props.onCheckboxSelect(data)
            }
        }
    }

    useEffect(() => {
        setChildren(props.children)
    }, [props.children])

    return (
        <div
            onClick={selectClicked}
            className={className(classes.select, undefined, [props.cls ?? ''])}
            style={props.style}
            ref={selectRef}
        >
            <div
                className={className(classes.activeItem, {
                    [classes.clicked]: clicked,
                    [classes.active]: clicked || !activeOptionLabel.length,
                    [classes.disabled]: props.disabled || props.loading,
                })}
            >
                {props.placeholder ? (
                    <span className={classes.placeholder}>{props.placeholder}</span>
                ) : null}
                {!isOpen ? (
                    <span className={classes.text}>{activeOptionLabel}</span>
                ) : null}
                <ArrowDown
                    className={classes.icon}
                    style={{'transition': `all ${duration}s ease-in-out`}}
                />
            </div>
            <div
                ref={dropdownRef}
                onClick={optionClicked}
                className={className(classes.items, {[classes.itemsActive]: clicked})}
            >
                {getModifiedChildren()}
            </div>
        </div>
    )
}

export default SelectContainer
