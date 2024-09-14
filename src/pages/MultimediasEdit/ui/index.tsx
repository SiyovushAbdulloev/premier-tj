import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {MultimediaForm} from "src/widgets/MultimediaForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getMediaContent} from "src/entities/MediaContent";

const MultimediasEditPage = () => {
    const {slug} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getMediaContent(slug))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <MultimediaForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default MultimediasEditPage
