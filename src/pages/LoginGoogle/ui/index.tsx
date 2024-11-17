import classes from './index.module.css'
import {useSelector} from "react-redux";
import {getAuthUserData, userActions} from "src/entities/User";
import {RoutesConfig} from "src/shared/config/routes";
import {useNavigate, useSearchParams} from "react-router-dom";
import {getIsLoggingGoogle, googleAuth} from "src/entities/Auth";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg"
import {useEffect, useRef} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import toast from "react-hot-toast";

const LoginGooglePage = () => {
    const authData = useSelector(getAuthUserData)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')
    const scope = searchParams.get('scope')
    const authuser = searchParams.get('authuser')
    const prompt = searchParams.get('prompt')
    const isLogging = useSelector(getIsLoggingGoogle)
    const dispatch = useAppDispatch()
    const counter = useRef(0)

    if (authData) {
        navigate(RoutesConfig.user_profile.path)
    }
    if (!code || !scope || !authuser || !prompt) {
        navigate(RoutesConfig.main.path)
    }

    useEffect(() => {
        const login = async () => {
            const response = await dispatch(googleAuth({
                code: code ?? '',
                scope: scope ?? '',
                authuser: authuser ?? '',
                prompt: prompt ?? ''
            }))
            if (response.type.includes('fulfilled')) {
                await dispatch(userActions.setAuthData(response.payload.user))
            } else if (response.type.includes('rejected')) {
                navigate(RoutesConfig.main.path)
                toast('Что-то пошло не так. Попробуйте заново!')
            }
        }

        if (counter.current === 0) {
            counter.current = counter.current + 1
            login()
        }
    }, [])

    return (
        <div>
            <h1 className={classes.pageTitle}>Производиться вход... {isLogging ? (
                <Loading className={classes.fetching} />
            ) : null}</h1>
        </div>
    )
}

export default LoginGooglePage
