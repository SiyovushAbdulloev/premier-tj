import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useRef} from "react";
import {getCountries, getData, getFetching, getPagination} from "src/entities/Country";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {Input} from "src/shared/ui/Input";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const CountriesPage = () => {
    const searchRef = useRef<string>('')
    const dispatch = useAppDispatch()
    const countries = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams() //TODO: Get page from url param. DO IT WHEN FIX REFRESHING IN ADMIN PANEL

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    const fetchCountries = (value: number) => {
        // @ts-ignore
        dispatch(getCountries({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onSearch = () => {
        // @ts-ignore
        dispatch(getCountries({page: pagination.current_page, q: searchRef.current}))
        navigate(location.pathname + `?page=${pagination.current_page}?q=${searchRef.current}`)
    }

    const onCreate = () => {
        //TODO: Redirect to create page of country
    }

    return (
        <div className={classes.countriesPage}>
            <h1 className={classes.pageTitle}>Страны</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <header className={classes.pageHeader}>
                            <div className={classes.search}>
                                <Input
                                    ref={searchRef}
                                    placeholder={'Таджикистан'}
                                    style={{
                                        'width': '400px',
                                        'borderColor': '#ececec',
                                        'borderRight': 'none'
                                    }}
                                />
                                <button
                                    type={'button'}
                                    className={classes.searchBtn}
                                    onClick={onSearch}
                                >
                                    Поиск
                                </button>
                            </div>
                            <button
                                className={classes.createModel}
                                onClick={onCreate}
                            >
                                <Plus width={24} height={24} />
                                Добавить страну
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={countries}
                            pagination={pagination}
                            onChangePage={fetchCountries}
                        >
                            <TableColumn label={'Идентификатор'} prop={'id'} />
                            <TableColumn label={'Наименование'} prop={'name'} />
                        </Table>
                    </>
            )}
        </div>
    )
}

export default CountriesPage
