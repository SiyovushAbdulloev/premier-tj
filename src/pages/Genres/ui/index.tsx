import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {destroyGenre, getData, getFetching, getGenres, getPagination} from "src/entities/Genre";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {Input} from "src/shared/ui/Input";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";

const GenresPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const genres = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams() //TODO: Get page from url param. DO IT WHEN FIX REFRESHING IN ADMIN PANEL

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    const fetchGenres = (value: number) => {
        // @ts-ignore
        dispatch(getGenres({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onSearch = () => {
        // @ts-ignore
        dispatch(getGenres({page: pagination.current_page, q: search}))
        navigate(location.pathname + `?page=${pagination.current_page}?q=${search}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_genres_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_genres_edit.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить этот жанр?')) {
            dispatch(destroyGenre(id))
                .then(data => {
                    onSearch()
                })
        }
    }

    return (
        <div className={classes.genresPage}>
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
                                    value={search}
                                    onChange={(value: string) => setSearch(value)}
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
                                Добавить жанр
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={genres}
                            pagination={pagination}
                            onChangePage={fetchGenres}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Наименование'}
                                prop={'name'}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onEdit(data.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classes.destroy}
                                                onClick={() => onDestroy(data.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )
                                }}
                            />
                        </Table>
                    </>
            )}
        </div>
    )
}

export default GenresPage
