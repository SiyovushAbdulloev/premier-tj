import classes from './index.module.css'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    approveSubscriptionRequest,
    getIsApproving,
    getIsFetchingOne, getIsRejecting,
    getSubscriptionRequest, rejectSubscriptionRequest,
    SubscriptionRequest
} from "src/entities/SubscriptionRequest";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg"
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg"
import {className} from "src/shared/utils/className";
import {RoutesConfig} from "src/shared/config/routes";

const SubscriptionRequestsShowPage = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const [data, setData] = useState<SubscriptionRequest | null>(null)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const isApproving = useSelector(getIsApproving)
    const isRejecting = useSelector(getIsRejecting)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await dispatch(getSubscriptionRequest(parseInt(id ?? '0')))
            if (response.type.includes('fulfilled')) {
                setData(response.payload)
            }
        }
        fetchData()
    }, [])

    const onReject = async () => {
        const data = await dispatch(rejectSubscriptionRequest(parseInt(id ?? '1')))
        if (data.type.includes('fulfilled')) {
            back()
        }
    }

    const onApprove = async () => {
        const data = await dispatch(approveSubscriptionRequest(parseInt(id ?? '1')))
        if (data.type.includes('fulfilled')) {
            back()
        }
    }

    const back = () => {
        navigate(-1)
    }

    return (
        <div className={classes.showPage}>
            {isFetchingOne ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <section className={classes.section}>
                        <h2 className={classes.sectionTitle}>Пользователь</h2>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Почта:</span>
                            {/*<span className={classes.infoFieldLabel}>{data ? data.user.email : ''}</span>*/}
                        </div>
                    </section>
                    <section className={classes.section}>
                        <h2 className={classes.sectionTitle}>Подписка</h2>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Имя:</span>
                            <span className={classes.infoFieldLabel}>{data ? data.subscription.name : ''}</span>
                        </div>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Описание:</span>
                            <span className={classes.infoFieldValue}>{data ? data.subscription.description : ''}</span>
                        </div>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Цена:</span>
                            <span className={classes.infoFieldLabel}>{data ? data.subscription.price : ''} смн.</span>
                        </div>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Длительность:</span>
                            <span className={classes.infoFieldLabel}>{data ? data.subscription.duration : ''} дней</span>
                        </div>
                    </section>
                    <section className={classes.section}>
                        <h2 className={classes.sectionTitle}>Заявка</h2>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Статус:</span>
                            <span className={classes.infoFieldLabel}>{data ? data.status : ''}</span>
                        </div>
                        <div className={classes.infoField}>
                            <span className={classes.infoFieldLabel}>Текст:</span>
                            <span className={classes.infoFieldValue}>{data ? data.text : ''}</span>
                        </div>
                    </section>
                    {data && data.status === 'new' ? (
                        <div className={classes.actions}>
                            <button
                                onClick={onReject}
                                className={className(classes.action, undefined, [classes.reject])}
                            >
                                {isRejecting ? (
                                    <Loading width={16} height={16} />
                                ) : 'Отклонить'}
                            </button>
                            <button
                                onClick={onApprove}
                                className={className(classes.action, undefined, [classes.approve])}
                            >
                                {isApproving ? (
                                    <Loading width={16} height={16} />
                                ) : 'Подтвердить'}
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </div>
    )
}

export default SubscriptionRequestsShowPage
