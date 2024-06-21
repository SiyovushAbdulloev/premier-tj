import React, {CSSProperties, MutableRefObject, useEffect, useRef, useState} from 'react'
import classes from './index.module.css'
import {className} from "src/shared/utils/className";

interface AnimatedProps {
    children: any
    open?: boolean
    style?: CSSProperties
    cls?: string
    duration: number
    height?: number | null
}

const AnimatedCollapse = React.forwardRef((props: AnimatedProps, ref) => {
    const [height, setHeight] = useState(0)
    const divRef = useRef<HTMLDivElement>(null)
    const cls = props.cls ?? ''


    useEffect(() => {
        if (props.open) {
            if (props.height) {
                setHeight(props.height)
            } else {
                if (divRef.current) {
                    setHeight(divRef.current.getBoundingClientRect().height)
                } else {
                    setHeight(0)
                }
            }
        } else {
            setHeight(0)
        }
    }, [props.open, props.height])

    return (
        <>
            <div className={className('', {}, [cls])}>
                <div className={className(classes.myCollapse)} style={{'height': height, 'transition': `height ${props.duration}s ease-in-out`}}>
                    <div ref={divRef as MutableRefObject<any>}>
                        <div className="p-3">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    )
})

AnimatedCollapse.displayName = 'AnimatedCollapse'

export default AnimatedCollapse
