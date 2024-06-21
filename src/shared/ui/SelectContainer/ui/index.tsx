import React, {CSSProperties, ReactNode, useCallback, useEffect, useState} from 'react'
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
}

export interface SelectedOption {
    value: any
    label: string
}

const SelectContainer = (props: SelectProps) =>  {
    const [children, setChildren] = useState(props.children)
    const [activeOptions, setActiveOptions] = useState<Array<any>>([props.value])

    useEffect(() => {
        setActiveOptions([props.value])
    }, [props.value])

    const activeOptionLabel = (function (): string {
        if (activeOptions.length) {
            if (isArray(children)) {
                // @ts-ignore
                if (children.length === 0) {
                    return ''
                }
            }
            if (React.isValidElement(children)) {
                // @ts-ignore
                return children.props.label
            }
            //@ts-ignore
            if (children && children.length) {
                // @ts-ignore
                const actives = children.filter((child:  ReactNode) => activeOptions.includes(child.props.value))
                if (actives.length) {
                    return actives.map((active: any) => active.props.label).join(',')
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
    const duration = props.duration ?? .1

    const getModifiedChildren = useCallback(() => {
        let item: ReactNode
        let items
        if (React.isValidElement(children)) {
            const ch: ReactNode = {...children}
            // @ts-ignore
            item = {...ch}
            // @ts-ignore
            if (activeOptions.includes(ch?.props?.value)) {
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
            items = !children ? [] : (children as Array<React.ReactNode>).map((child: ReactNode, index: number) => {
                // @ts-ignore
                const ch: ReactNode = {...child}
                if (index === 0) {
                    // @ts-ignore
                    item = {...ch}
                }
                // @ts-ignore
                if (activeOptions.includes(ch?.props?.value)) {
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
                return ch
            })
        }

        return items.filter(item => {
            if (item) {
                //@ts-ignore
                if (item.props.value === '') {
                    return true
                }
                //@ts-ignore
                if (!props.chosenValues?.includes(item.props.value)) {
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
                if (activeOptions.includes(value)) {
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
                // @ts-ignore
                const item = children.find((child:  ReactNode) => child.props.value == value)
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
            className={className(classes.select, undefined, [])}
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
                onClick={optionClicked}
                className={className(classes.items, {[classes.itemsActive]: clicked})}
            >
                {getModifiedChildren()}
            </div>
        </div>
    )
}

export default SelectContainer
