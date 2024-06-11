import React, {CSSProperties, ReactNode, useCallback, useEffect, useState} from 'react'
import {className} from "src/shared/utils/className";
import {useOutsideClick} from "src/shared/hooks/useClickOutside";
import {AnimatedCollapse} from "src/shared/ui/AnimatedCollapse";
import classes from './index.module.css'
import {ReactComponent as ArrowDown} from 'src/shared/assets/icons/arrow_down.svg'
import {isArray} from "src/shared/utils/isArray";
import {ReactComponent as Cancel} from 'src/shared/assets/icons/cancel_badge.svg'

interface SelectProps extends React.PropsWithChildren{
    style?: CSSProperties
    onSelect: (option: SelectedOption) => void
    onRemove?: (data: any) => void
    duration?: number
    placeholder?: string
    disabled?: boolean
    height?: number | null
    value: Array<any>
    chosenValues?: Array<any>
    loading?: boolean
}

export interface SelectedOption {
    value: any
    label: string
}

const Select = (props: SelectProps) =>  {
    const [children, setChildren] = useState(props.children)
    const [activeOptions, setActiveOptions] = useState(props.value)

    useEffect(() => {
        setActiveOptions(props.value)
    }, [props.value])

    const activeOptionsLabel = (function (): Array<string> {
        if (activeOptions && activeOptions.length) {
            if (isArray(children)) {
                // @ts-ignore
                if (children.length === 0) {
                    return ['']
                }
            }
            if (React.isValidElement(children)) {
                // @ts-ignore
                return children.props.label
            }
            //@ts-ignore
            if (children && children.length) {
                // @ts-ignore
                const actives: Array<string> = []

                //@ts-ignore
                children.forEach((child: ReactNode) => {
                    //@ts-ignore
                    if (activeOptions && activeOptions.includes(child.props.value)) {
                        //@ts-ignore
                        actives.push(child.props.label)
                    }
                })
                if (actives.length) {
                    return actives
                }
                return [props.placeholder ?? '']
            }
            return ['']
        } else {
            return [props.placeholder ?? '']
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
                if (activeOptions && activeOptions.includes(ch?.props?.value)) {
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

        if (item) {
            // @ts-ignore
            const prop = {...item.props}
            prop['value'] = ''
            prop['label'] = props.placeholder
            // @ts-ignore
            item.props = prop
            // @ts-ignore
            items.unshift(React.cloneElement(item, {key: 'placeholder'}))
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
            if (!isOpen) {
                setIsOpen(true)
            }
            if (!clicked) {
                setClicked(true)
            }
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
            let data = [...activeOptions]

            if (data.includes(value)) {
                data = data.filter((item) => item !== value)
            } else {
                data.push(value)
            }

            setActiveOptions(data)
            // @ts-ignore
            if (value.length === 0 && props.placeholder?.length > 0) {
                props.onSelect({
                    value: '',
                    label: props.placeholder ?? '',
                })
            } else {
                if (React.isValidElement(children)) {
                    props.onSelect({
                        // @ts-ignore
                        value: children.props.value,
                        // @ts-ignore
                        label: children.props.label,
                    })
                } else {
                    // @ts-ignore
                    const item = children.find((child:  ReactNode) => child.props.value == value)
                    props.onSelect({
                        value: item.props.value,
                        label: item.props.label,
                    })
                }
            }
        }
    }

    const onRemoveOption = (index: number) => {
        let data = [...activeOptions]
        const item = data.find((item, key) => key === index)
        data = data.filter((item, key) => key !== index)
        setActiveOptions(data)
        if (props.onRemove) {
            props.onRemove(item)
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
                    [classes.disabled]: props.disabled || props.loading,
                })}
            >
                {(activeOptionsLabel.length === 1 && activeOptionsLabel[0] === props.placeholder) ? (
                    activeOptionsLabel.map((label, index) => {
                        return (
                            <span
                                key={label + index}
                            >
                        {label}
                    </span>
                        )
                    })
                    ) : (
                    <div className={classes.badgeContainer}>
                        {activeOptionsLabel.map((label, index) => {
                            return (
                                <span
                                    className={classes.badge}
                                    key={label + index}
                                >
                                    {label}
                                    <span onClick={() => onRemoveOption(index)}>
                                        <Cancel className={classes.cancel} />
                                    </span>
                                </span>
                            )
                        })}
                    </div>
                )}
                <ArrowDown
                    style={{'transition': `all ${duration}s ease-in-out`}}
                />
            </div>
            <div
                onClick={optionClicked}
                className={className(classes.items, {[classes.itemsActive]: clicked})}
            >
                <AnimatedCollapse
                    height={props.height}
                    duration={duration}
                    open={isOpen}
                >
                    {getModifiedChildren()}
                </AnimatedCollapse>
            </div>
        </div>
    )
}

export default Select
