import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {MainPageSectionForm} from "src/widgets/MainPageSectionForm";

const MainPageSectionsCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <MainPageSectionForm type={FormType.CREATE} />
        </div>
    )
}

export default MainPageSectionsCreatePage
