import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {destroyActor, getActors, getData, getFetching, getPagination} from "src/entities/Actor";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {Input} from "src/shared/ui/Input";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";

const ActorsPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const actors = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams() //TODO: Get page from url param. DO IT WHEN FIX REFRESHING IN ADMIN PANEL

    useEffect(() => {
        dispatch(getActors())
    }, [])

    const fetchActors = (value: number) => {
        // @ts-ignore
        dispatch(getActors({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onSearch = () => {
        // @ts-ignore
        dispatch(getActors({page: pagination.current_page, q: search}))
        navigate(location.pathname + `?page=${pagination.current_page}?q=${search}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_actors_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_actors_edit.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить этоо актера?')) {
            dispatch(destroyActor(id))
                .then(data => {
                    onSearch()
                })
        }
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Актеры</h1>
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
                                    placeholder={'Бред Пит'}
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
                                Добавить актера
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={actors}
                            pagination={pagination}
                            onChangePage={fetchActors}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Наименование'}
                                prop={'first_name'}
                            />
                            <TableColumn
                                label={'Фамилия'}
                                prop={'last_name'}
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

export default ActorsPage
