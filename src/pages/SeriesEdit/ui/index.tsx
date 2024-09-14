import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SeriesForm} from "src/widgets/SeriesForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getSeries} from "src/entities/Series";

const SeriesEditPage = () => {
    const {slug} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getSeries(slug ?? ''))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <SeriesForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default SeriesEditPage
