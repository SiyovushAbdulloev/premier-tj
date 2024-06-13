import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SerieSeasonForm} from "src/widgets/SerieSeasonForm";

const SerieSeasonsCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <SerieSeasonForm type={FormType.CREATE} />
        </div>
    )
}

export default SerieSeasonsCreatePage
