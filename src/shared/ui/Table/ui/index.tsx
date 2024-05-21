import React, {ReactNode, useCallback, useMemo, useState} from 'react'
import classes from "./index.module.css"
import TableColumn, {TableColumnProps} from './TableColumn'
import {Input} from "src/shared/ui/Input";
import {Pagination} from "src/entities/Country";
import {className} from "src/shared/utils/className";

interface TableData {
    [key: string]: any
}

interface TableProps {
    data: Array<TableData> | TableData | []
    style?: Object
    children: ReactNode
    onSearch?: (text: string) => void
    searchable?: boolean
    pagination?: Pagination
    onChangePage?: (value: number) => void
}

export default function Table(props: TableProps) {
    const {searchable = false, children, style = {}, data} = props
    const [value, setValue] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(props.pagination ? props.pagination.current_page : 1)

    const getValidColumns = useCallback((children: ReactNode): Array<TableColumnProps> => {
        let columns: Array<TableColumnProps>

        if (React.isValidElement(children)) {
            // @ts-ignore
            if (children.prop) {
                columns = [{
                    // @ts-ignore
                    prop: children.prop,
                    // @ts-ignore
                    label: children.label,
                    // @ts-ignore
                    style: children.style,
                }]
            } else {
                columns = [{
                    // @ts-ignore
                    prop: children.props?.children,
                    // @ts-ignore
                    label: children.label,
                    // @ts-ignore
                    style: children.style,
                }]
            }
        } else {
            // @ts-ignore
            columns = children.map((child: ReactNode): TableColumnProps => {
                let column: TableColumnProps
                // @ts-ignore
                const props = child.props
                // @ts-ignore
                column = {
                    // @ts-ignore
                    prop: props.prop,
                    // @ts-ignore
                    label: props.label,
                    // @ts-ignore
                    style: props.style,
                    row: props.row
                }
                return column
            })
        }

        return columns
    }, [])

    let columns: Array<TableColumnProps> = getValidColumns(children)

    const rows = data.map((item: any) => {
        const value: any = {}
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i]
            if (column.prop) {
                // @ts-ignore
                if (column.row) {
                    value[column.prop] = column.row(item)
                } else {
                    value[column.prop] = item[column.prop]
                }
            } else {
                // @ts-ignore
                value['prop'] = column.row(item)
            }
        }

        return value
    })
    const search = (value: string) => {
        if (props.onSearch) {
            props.onSearch(value)
        }
    }

    const onCurrentPage = (value: number) => {
        setCurrentPage(value)
        if (props.onChangePage) {
            props.onChangePage(value)
        }
    }

    const getPagination = useMemo((): Array<React.ReactNode> => {
        const data: Array<React.ReactNode> = []
        let dotsPushed = false
        if (props.pagination) {
            for (let i = 1; i <= props.pagination?.last_page; i++) {
                if (
                    i === 1 ||
                    i === 2 ||
                    (i + 1) === currentPage ||
                    (currentPage + 1) === i ||
                    i === props.pagination.last_page ||
                    i === currentPage
                ) {
                    data.push((
                        <span
                            onClick={() => onCurrentPage(i)}
                            key={i}
                            className={className(classes.paginationItem, {[classes.activePagItem]: i === currentPage})}
                        >
                        {i}
                    </span>
                    ))
                } else if (!dotsPushed) {
                    data.push((
                        <span
                            key={i}
                            className={className(classes.dots)}
                        >
                        ...
                    </span>
                    ))
                    dotsPushed = true
                }
            }
        }
        return data
    }, [props.pagination, currentPage])

    const perPageOptions = useMemo(() => {
        return [5,10,20,40]
    }, [])

    return (
        <div
            className={classes.table}
            style={style}
        >
            {searchable ? (
                <div className={classes.header}>
                    <Input
                        value={value}
                        style={{'width': '300px', 'borderColor': 'rgb(190, 190, 190)'}}
                        placeholder='Введите...'
                        disabled={false}
                        clearable={true}
                        onChange={(value) => search(value)}
                    />
                </div>
            ) : null}
            <div className={classes.tableThead}>
                <div className={classes.tableTh}>
                    {columns.map((column: TableColumnProps) => {
                        return (
                            <TableColumn
                                key={column.prop}
                                label={column.label}
                                style={column.style}
                            />
                        )
                    })}
                </div>
            </div>
            <div className={classes.tableTbody}>
                {rows.length > 0 ? rows.map((row: any, index: any) => {
                    return (
                        <div key={index} className={classes.tableTr}>
                            { Object.keys(row).map((key: string) => {
                                return (
                                    <div key={key} className={classes.tableTd}>
                                        {row[key]}
                                    </div>
                                )
                            })}
                        </div>
                    )
                }) : (
                    <h4 className={classes.noData}>No data</h4>
                )}
            </div>
            {props.pagination && rows.length > 0 && (
                <div className={classes.tablePagination}>
                    <div className={classes.perPage}>
                        {/*<span>Rows per page:</span>*/}
                        {/*<select*/}
                        {/*    name="perPage"*/}
                        {/*    value={props.pagination?.per_page}*/}
                        {/*>*/}
                        {/*    {perPageOptions.map(option => {*/}
                        {/*        return (*/}
                        {/*            <option*/}
                        {/*                key={option}*/}
                        {/*                value={option}*/}
                        {/*            >*/}
                        {/*                {option}*/}
                        {/*            </option>*/}
                        {/*        )*/}
                        {/*    })}*/}
                        {/*</select>*/}
                    </div>
                    <div className={classes.paginationItems}>
                        {
                            getPagination
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
