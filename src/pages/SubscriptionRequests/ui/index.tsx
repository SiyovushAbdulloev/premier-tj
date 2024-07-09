import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroySubscriptionRequest,
    getData,
    getFetching,
    getPagination,
    getSubscriptionRequests, SubscriptionRequest
} from "src/entities/SubscriptionRequest";
import {className} from "src/shared/utils/className";

const SubscriptionRequestsPage = () => {
    const dispatch = useAppDispatch()
    const requests = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getSubscriptionRequests({
            page: parseInt(searchParams.get('page') ?? '1')
        }))
    }, [])

    const fetchRequests = (value: number) => {
        // @ts-ignore
        dispatch(getSubscriptionRequests({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onShow = (id: number) => {
        navigate(RoutesConfig.admin_subscription_requests_show.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить эту заявку?')) {
            dispatch(destroySubscriptionRequest(id))
                .then(data => {
                    fetchRequests(pagination.current_page)
                })
        }
    }

    return (
        <div className={classes.countriesPage}>
            <h1 className={classes.pageTitle}>Заявки на подписки</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={requests}
                            pagination={pagination}
                            onChangePage={fetchRequests}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Содержимое'}
                                prop={'text'}
                            />
                            <TableColumn
                                label={'Содержимое'}
                                prop={'status'}
                                row={(data: SubscriptionRequest) => {
                                    return (
                                        <span className={className(classes.badge, {
                                            [classes.new]: data.status === 'new',
                                            [classes.approved]: data.status === 'approved',
                                            [classes.rejected]: data.status === 'rejected',
                                        })}>
                                            {data.status}
                                        </span>
                                    )
                                }}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onShow(data.id)}
                                            >
                                                Show
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

export default SubscriptionRequestsPage
