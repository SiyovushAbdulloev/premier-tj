import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SeasonEpisodeForm} from "src/widgets/SeasonEpisodeForm";

const SeasonEpisodesCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <SeasonEpisodeForm type={FormType.CREATE} />
        </div>
    )
}

export default SeasonEpisodesCreatePage
