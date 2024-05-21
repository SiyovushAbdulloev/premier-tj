import classes from './index.module.css'
import {GenreForm} from "src/widgets/GenreForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getGenre} from "src/entities/Genre";

const GenresEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getGenre(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <GenreForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default GenresEditPage
