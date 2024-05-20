import React from 'react'
import classes from "./index.module.css"

export interface TableColumnProps extends React.PropsWithChildren{
    prop?: string
    label: any
    style?: Object
    row?: (data: any) => void
}

export default function TableColumn(props: TableColumnProps) {
    return (
        <div
            className={classes.tableColumn}
            style={props.style}
        >
            {props.label}
        </div>
    )
}
