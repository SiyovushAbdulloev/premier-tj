import classes from './index.module.css'
import {ActorForm} from "src/widgets/ActorForm";
import {FormType} from "src/shared/constants/formType";

const ActorsCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <ActorForm type={FormType.CREATE} />
        </div>
    )
}

export default ActorsCreatePage
