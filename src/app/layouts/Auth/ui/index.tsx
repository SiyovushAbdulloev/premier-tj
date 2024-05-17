import classes from './index.module.css'
import React from "react";

const AuthLayout = (props: React.PropsWithChildren) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default AuthLayout