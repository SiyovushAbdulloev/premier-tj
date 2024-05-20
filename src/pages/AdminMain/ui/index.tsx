import classes from './index.module.css'
import {useSelector} from "react-redux";
import {getAuthUserData} from "src/entities/User";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {Roles} from "src/shared/config/routes/roles";
const AdminMainPage = () => {
    const navigate = useNavigate()
    const authData = useSelector(getAuthUserData)
    if (!authData) {
        navigate(RoutesConfig.main.path)
    }
    if (authData && authData.roles[0].name !== Roles.ADMIN) {
        navigate(RoutesConfig.unauthorized.path)
    }
    return (
        <div className={classes.mainPage}>
            <span>AdminMain page</span>
        </div>
    )
}

export default AdminMainPage
