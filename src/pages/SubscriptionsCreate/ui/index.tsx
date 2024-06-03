import classes from './index.module.css'
import {SubscriptionForm} from "src/widgets/SubscriptionForm";
import {FormType} from "src/shared/constants/formType";

const SubscriptionsCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <SubscriptionForm type={FormType.CREATE} />
        </div>
    )
}

export default SubscriptionsCreatePage
