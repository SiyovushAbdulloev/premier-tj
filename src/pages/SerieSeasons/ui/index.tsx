import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroySerieSeason,
    getData,
    getFetching,
    getPagination,
    getSerieSeasons,
    SerieSeason
} from "src/entities/SerieSeason";
import {SeasonEpisode} from "src/entities/SeasonEpisode";

const SerieSeasonsPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const serieSeasons = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const {id} = useParams()

    useEffect(() => {
        dispatch(getSerieSeasons({
            page: parseInt(searchParams.get('id') ?? '1'),
            serie: parseInt(id ?? '0')
        }))
    }, [])

    const fetchSerieSeasons = (value: number) => {
        // @ts-ignore
        dispatch(getSerieSeasons({page: value,  serie: parseInt(id ?? '0')}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_serie_seasons_create.path.replace(':id', `${id}`))
    }

    const onEdit = (season: number) => {
        navigate(RoutesConfig.admin_serie_seasons_edit.path.replace(':id', `${id}`).replace(':seasonId', `${season}`))
    }

    const onEpisodes = (season: number) => {
        navigate(RoutesConfig.admin_serie_season_episodes.path.replace(':id', `${id}`).replace(':seasonId', `${season}`))
    }

    const onBack = () => {
        navigate(-1)
    }

    const onDestroy = (season: number) => {
        if (window.confirm('Вы действительно хотите удалить этот сезон? Связанные с ним серии будут удалены.')) {
            dispatch(destroySerieSeason({id: season, serie: parseInt(id ?? '0')}))
                .then(data => {
                    fetchSerieSeasons(pagination.current_page)
                })
        }
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Сезоны</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <header className={classes.pageHeader}>
                            <button
                                className={classes.createModel}
                                onClick={onBack}
                            >
                                <Plus width={24} height={24} />
                                Назад
                            </button>
                            <button
                                className={classes.createModel}
                                onClick={onCreate}
                            >
                                <Plus width={24} height={24} />
                                Добавить сезон
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={serieSeasons}
                            pagination={pagination}
                            onChangePage={fetchSerieSeasons}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Число'}
                                prop={'number'}
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
                                row={(data: SerieSeason) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onEpisodes(data.id)}
                                            >
                                                Серии
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

export default SerieSeasonsPage
