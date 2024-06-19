import classes from './index.module.css'
import React, {CSSProperties, ForwardedRef, forwardRef, useEffect, useState} from "react";
import {className} from "src/shared/utils/className";

interface ModalProps extends React.PropsWithChildren{
    style?: CSSProperties
    onChange?: (value: boolean) => void
    value?: boolean
}

const Modal = forwardRef((props: ModalProps, ref: ForwardedRef<any>) => {
    const {style = {}, value = false} = props
    const [isOpen, setIsOpen] = useState<boolean>(value)

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

    return (
        <div className={className(classes.modal, {[classes.modalActive]: isOpen})} >
            <div className={classes.modalContent} style={style}>
                <button
                    className={classes.close}
                    onClick={setOpen}
                    type={'button'}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        width={20}
                        height={20}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
                {props.children}
            </div>
        </div>
    )
})

Modal.displayName = 'Modal'

export default Modal
