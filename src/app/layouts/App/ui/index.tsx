import classes from './index.module.css'
import React from "react";

const AppLayout = (props: React.PropsWithChildren) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default AppLayout