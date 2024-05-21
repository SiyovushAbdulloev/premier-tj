import classes from './index.module.css'
import {CountryForm} from "src/widgets/CountryForm";
import {FormType} from "src/shared/constants/formType";

const CountriesCreatePage = () => {
    return (
        <div className={classes.createPage}>
            <CountryForm type={FormType.CREATE} />
        </div>
    )
}

export default CountriesCreatePage
