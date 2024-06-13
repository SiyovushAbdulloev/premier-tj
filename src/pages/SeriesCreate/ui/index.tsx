import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SeriesForm} from "src/widgets/SeriesForm";

const SeriesCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <SeriesForm type={FormType.CREATE} />
        </div>
    )
}

export default SeriesCreatePage
