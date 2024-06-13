import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {MultimediaForm} from "src/widgets/MultimediaForm";

const MultimediasCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <MultimediaForm type={FormType.CREATE} />
        </div>
    )
}

export default MultimediasCreatePage
