import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {MovieForm} from "src/widgets/MovieForm";

const MoviesCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <MovieForm type={FormType.CREATE} />
        </div>
    )
}

export default MoviesCreatePage
