import classes from './index.module.css'
import React, {CSSProperties, ForwardedRef, forwardRef, MutableRefObject, useEffect, useRef, useState} from "react";
import {className} from "src/shared/utils/className";

interface ModalProps extends React.PropsWithChildren{
    style?: CSSProperties
    onChange?: (value: boolean) => void
    value?: boolean
}

const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<any>) => {
    const {style = {}, value = false} = props
    const [isOpen, setIsOpen] = useState<boolean>(value)
    const [height, setHeight] = useState<number>(0)
    const modalRef = useRef<HTMLDivElement>()

    const setOpen = () => {
        const value = !isOpen
        setIsOpen(value)
        if (props.onChange) {
            props.onChange(value)
        }
    }

    useEffect(() => {
        setIsOpen(value)
    }, [value])

    useEffect(() => {
        if (modalRef.current) {
            setHeight(modalRef.current?.getBoundingClientRect().height)
        }
    }, [])

    return (
        <div
            className={className(classes.modal, {[classes.modalActive]: isOpen})}
            style={{...style, 'bottom': `-${height + 20}px`}}
            ref={modalRef as MutableRefObject<HTMLDivElement>}
        >
            <div className={classes.modalContent}>
                {props.children}
            </div>
        </div>
    )
})

Modal.displayName = 'Modal'

export default Modal
