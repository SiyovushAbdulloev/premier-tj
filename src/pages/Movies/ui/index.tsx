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
import {
    destroyMediaContent,
    getData,
    getFetching,
    getMediaContents,
    getPagination, MediaContent
} from "src/entities/MediaContent";

const MoviesPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const movies = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getMediaContents({
            page: parseInt(searchParams.get('page') ?? '1'),
            q: searchParams.get('q') ?? '',
            type: 2
        }))
    }, [])

    const fetchMediaContents = (value: number) => {
        // @ts-ignore
        dispatch(getMediaContents({page: value, type: 2}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onSearch = () => {
        // @ts-ignore
        dispatch(getMediaContents({page: pagination.current_page, q: search, type: 2}))
        navigate(location.pathname + `?page=${pagination.current_page}&q=${search}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_movies_create.path)
    }

    const onEdit = (slug: string) => {
        navigate(RoutesConfig.admin_movies_edit.path.replace(':slug', `${slug}`))
    }

    const onDestroy = (slug: string) => {
        if (window.confirm('Вы действительно хотите удалить этого файла?')) {
            dispatch(destroyMediaContent(slug))
                .then(data => {
                    onSearch()
                })
        }
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Фильмы</h1>
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
                                Добавить фильм
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={movies}
                            pagination={pagination}
                            onChangePage={fetchMediaContents}
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
                                label={'Действия'}
                                prop={''}
                                row={(data: MediaContent) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onEdit(data.slug)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classes.destroy}
                                                onClick={() => onDestroy(data.slug)}
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

export default MoviesPage
