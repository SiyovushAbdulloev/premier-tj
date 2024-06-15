import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {Input} from "src/shared/ui/Input";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {destroySeries, getAllSeries, getData, getFetching, getPagination, Series} from "src/entities/Series";
import {SeasonEpisode} from "src/entities/SeasonEpisode";

const SeriesPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const series = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getAllSeries({
            page: parseInt(searchParams.get('id') ?? '1'),
            q: searchParams.get('q') ?? ''
        }))
    }, [])

    const fetchSeries = (value: number) => {
        // @ts-ignore
        dispatch(getAllSeries({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onSearch = () => {
        // @ts-ignore
        dispatch(getAllSeries({page: pagination.current_page, q: search}))
        navigate(location.pathname + `?page=${pagination.current_page}&q=${search}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_series_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_series_edit.path.replace(':id', `${id}`))
    }

    const onSeasons = (id: number) => {
        navigate(RoutesConfig.admin_serie_seasons.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить этот сериал? Связанные с ним сезоны и серии будут удалены.')) {
            dispatch(destroySeries(id))
                .then(data => {
                    onSearch()
                })
        }
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Сериалы</h1>
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
                                    placeholder={'Имя,Описание'}
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
                                Добавить сериал
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={series}
                            pagination={pagination}
                            onChangePage={fetchSeries}
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
                                label={'Описание'}
                                prop={'description'}
                            />
                            <TableColumn
                                label={'Опубликован'}
                                prop={'is_published'}
                                row={(data: SeasonEpisode) => {
                                    return (
                                        <span>{data.is_published ? 'Да' : 'Нет'}</span>
                                    )
                                }}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data: Series) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onSeasons(data.id)}
                                            >
                                                Seasons
                                            </button>
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

export default SeriesPage
