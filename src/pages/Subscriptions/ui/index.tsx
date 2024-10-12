import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroySubscription,
    getData,
    getFetching,
    getPagination,
    getSubscriptions,
    Subscription
} from "src/entities/Subscription";

const SubscriptionsPage = () => {
    const dispatch = useAppDispatch()
    const countries = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getSubscriptions({
            page: parseInt(searchParams.get('page') ?? '1')
        }))
    }, [])

    const fetchSubscriptions = (value: number) => {
        // @ts-ignore
        dispatch(getSubscriptions({page: value}))
        navigate(location.pathname + `?page=${value}`)
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_subscriptions_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_subscriptions_edit.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить эту подписку?')) {
            dispatch(destroySubscription(id))
                .then(data => {
                    fetchSubscriptions(pagination.current_page)
                })
        }
    }

    return (
        <div className={classes.countriesPage}>
            <h1 className={classes.pageTitle}>Подписки</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <header className={classes.pageHeader}>
                            <button
                                className={classes.createModel}
                                onClick={onCreate}
                            >
                                <Plus width={24} height={24} />
                                Добавить подписку
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={countries}
                            pagination={pagination}
                            onChangePage={fetchSubscriptions}
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
                                label={'Цена(сомони)'}
                                prop={'price'}
                            />
                            <TableColumn
                                label={'Длительность(дни)'}
                                prop={'duration'}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data: Subscription) => {
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

export default SubscriptionsPage
