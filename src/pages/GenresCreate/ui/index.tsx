import classes from './index.module.css'
import {GenreForm} from "src/widgets/GenreForm";
import {FormType} from "src/shared/constants/formType";

const GenresCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <GenreForm type={FormType.CREATE} />
        </div>
    )
}

export default GenresCreatePage
