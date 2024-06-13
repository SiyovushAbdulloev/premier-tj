import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SerieSeasonForm} from "src/widgets/SerieSeasonForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getSerieSeason} from "src/entities/SerieSeason";

const SeriesEditPage = () => {
    const {id, seasonId} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getSerieSeason({
            id: parseInt(seasonId ?? '0'),
            serie: parseInt(id ?? '0')
        }))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <SerieSeasonForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default SeriesEditPage
