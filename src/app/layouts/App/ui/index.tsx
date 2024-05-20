import classes from './index.module.css'
import React from "react";
import AppNavbar from "src/widgets/AppNavbar/ui";

const AppLayout = (props: React.PropsWithChildren) => {
    return (
        <div className={classes.appLayout}>
            <AppNavbar />
            {props.children}
        </div>
    )
}

export default AppLayout
