import classes from './index.module.css'
// import {useSelector} from "react-redux";
// import {authActions, getUnauthorized} from "src/entities/Auth";
// import {useEffect} from "react";
// import {useNavigate} from 'react-router-dom'
// import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
const NotFoundPage = () => {
    // const unauthorized = useSelector(getUnauthorized)
    // const navigate = useNavigate()
    // const dispath = useAppDispatch()

    // useEffect(() => {
    //     console.log({unauthorized})
    //     if (!unauthorized) {
    //         console.log("GOTOLOGIN")
    //         navigate(-1)
    //     } else {
    //         dispath(authActions.setUnauthorized(false))
    //     }
    // }, [])

    return (
        <div className={classes.notFoundPage}>
            <h1>404</h1>
        </div>
    )
}

export default NotFoundPage