import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {Input} from "src/shared/ui/Input";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroySeasonEpisode,
    getData,
    getFetching,
    getPagination,
    getSeasonEpisodes,
    SeasonEpisode
} from "src/entities/SeasonEpisode";

const SeasonEpisodesPage = () => {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const seasonEpisodes = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const {id, seasonId} = useParams()

    useEffect(() => {
        dispatch(getSeasonEpisodes({
            page: parseInt(searchParams.get('id') ?? '1'),
            serie: parseInt(id ?? '0'),
            serie_season: parseInt(seasonId ?? '0')
        }))
    }, [])

    const fetchSeasonEpisodes = (value: number) => {
        // @ts-ignore
        dispatch(getSeasonEpisodes({
            page: value,
            serie: parseInt(id ?? '0'),
            serie_season: parseInt(seasonId ?? '0')
        }))
        navigate(location.pathname + `?page=${value}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_serie_season_episodes_create.path
            .replace(':id', `${id}`)
            .replace(':seasonId', `${seasonId}`))
    }

    const onBack = () => {
        navigate(RoutesConfig.admin_serie_seasons.path
            .replace(':id', `${id}`)
            .replace(':seasonId', `${seasonId}`))
    }

    const onEdit = (episode: number) => {
        navigate(RoutesConfig.admin_serie_season_episodes_edit.path
            .replace(':id', `${id}`)
            .replace(':seasonId', `${seasonId}`)
            .replace(':episodeId', `${episode}`))
    }

    const onDestroy = (episode: number) => {
        if (window.confirm('Вы действительно хотите удалить эту серию?')) {
            dispatch(destroySeasonEpisode({
                id: episode,
                serie: parseInt(id ?? '0'),
                serie_season: parseInt(seasonId ?? '0')
            }))
                .then(data => {
                    fetchSeasonEpisodes(pagination.current_page)
                })
        }
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Серии</h1>
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
                                Назад в сезоны
                            </button>
                            <button
                                className={classes.createModel}
                                onClick={onCreate}
                            >
                                <Plus width={24} height={24} />
                                Добавить серию
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={seasonEpisodes}
                            pagination={pagination}
                            onChangePage={fetchSeasonEpisodes}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Наименование'}
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
                                row={(data: SeasonEpisode) => {
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

export default SeasonEpisodesPage
