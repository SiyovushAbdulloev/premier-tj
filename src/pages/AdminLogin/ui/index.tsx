import classes from './index.module.css'
import Background from 'src/shared/assets/images/background.png'
import {TextField} from "src/shared/ui/TextField";
import React, {useRef, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getAuthUser, getIsLogging, getLoginErrors, loginAdmin} from "src/entities/Auth";
import {useSelector} from "react-redux";
import {ReactComponent as Loading} from 'src/shared/assets/icons/loading.svg'
const AdminLoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState(false)
    const dispatch = useAppDispatch()
    const errors = useSelector(getLoginErrors)
    const isLogging = useSelector(getIsLogging)

    const onRemember = () => {
        setRemember(!remember)
    }

    const onEmail = (value: string) => {
        setEmail(value)
    }

    const onPassword = (value: string) => {
        setPassword(value)
    }

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // @ts-ignore
        const data = await dispatch(loginAdmin({
            email: email,
            password: password,
            remember: remember,
        }))
        if (data.type.includes('fulfilled')) {
            dispatch(getAuthUser())
        }
    }

    return (
        <div className={classes.loginPage}>
            <div
                className={classes.background}
                style={{'backgroundImage': `url(${Background})`}}
            >
            </div>
            <form
                className={classes.form}
                onSubmit={login}
            >
                <h3 className={classes.formTitle}>Войдите в свою учетную запись</h3>
                {errors && Object.keys(errors).map((key: string) => {
                    return (
                        <div key={key}>
                            {errors[key].map((message: string) => {
                                return (
                                    <p
                                        key={message}
                                        className={classes.error}
                                    >
                                        {message}
                                    </p>
                                )
                            })}
                        </div>
                    )
                })}
                <TextField
                    value={email}
                    onChange={onEmail}
                    style={{'marginBottom': '15px'}}
                    id={'email'}
                    label={'Email'}
                    placeholder={'admin@admin.com'}
                />
                <TextField
                    value={password}
                    onChange={onPassword}
                    id={'password'}
                    label={'Password'}
                    placeholder={'d34fSXfas!3543'}
                />
                <div className={classes.remember}>
                    <input
                        checked={remember}
                        type="checkbox"
                        className={classes.rememberInput}
                        id={'remember'}
                        onChange={onRemember}
                    />
                    <label
                        htmlFor="remember"
                        className={classes.rememberLabel}
                    >
                        Запомни меня
                    </label>
                </div>
                <button className={classes.submit}>
                    {isLogging ? <Loading width={30} height={30}/> : 'Вход'}
                </button>
            </form>
        </div>
    )
}

export default AdminLoginPage
