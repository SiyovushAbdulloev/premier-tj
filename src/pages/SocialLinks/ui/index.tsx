import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {SeasonEpisode} from "src/entities/SeasonEpisode";
import {getData, getFetching, getLinks, getPagination, SocialLink} from "src/entities/SocialLink";

const SocialLinksPage = () => {
    const dispatch = useAppDispatch()
    const series = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getLinks({
            page: parseInt(searchParams.get('page') ?? '1'),
        }))
    }, [])

    const fetchLinks = (value: number) => {
        // @ts-ignore
        dispatch(getLinks({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onEdit = (name: string) => {
        navigate(RoutesConfig.admin_social_links_edit.path.replace(':name', `${name}`))
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Социальные сети</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <Table
                        style={{
                            'width': '100%',
                            'marginTop': '30px'
                        }}
                        data={series}
                        pagination={pagination}
                        onChangePage={fetchLinks}
                    >
                        <TableColumn
                            label={'Идентификатор'}
                            prop={'id'}
                        />
                        <TableColumn
                            label={'Наименование'}
                            prop={'label'}
                        />
                        <TableColumn
                            label={'Ссылка'}
                            prop={'path'}
                        />
                        <TableColumn
                            label={'Действия'}
                            prop={''}
                            row={(data: SocialLink) => {
                                return (
                                    <div className={classes.tableActions}>
                                        <button
                                            className={classes.createModel}
                                            onClick={() => onEdit(data.name)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )
                            }}
                        />
                    </Table>
            )}
        </div>
    )
}

export default SocialLinksPage
