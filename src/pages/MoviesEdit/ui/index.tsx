import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {MovieForm} from "src/widgets/MovieForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getMediaContent} from "src/entities/MediaContent";

const MoviesEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getMediaContent(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <MovieForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default MoviesEditPage
