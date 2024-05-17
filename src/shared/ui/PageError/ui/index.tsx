import classes from './index.module.css'
const PageError = () => {
    console.log("Class:", classes.pageError)
    return (
        <div className={classes.pageError}>Error Page</div>
    )
}

export default PageError