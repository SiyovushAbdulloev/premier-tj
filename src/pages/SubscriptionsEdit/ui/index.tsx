import classes from './index.module.css'
import {SubscriptionForm} from "src/widgets/SubscriptionForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getSubscription} from "src/entities/Subscription";

const SubscriptionsEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getSubscription(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <SubscriptionForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default SubscriptionsEditPage
