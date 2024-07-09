import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {PageSectionForm} from "src/widgets/PageSectionForm";

const PageSectionsCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <PageSectionForm type={FormType.CREATE} />
        </div>
    )
}

export default PageSectionsCreatePage
