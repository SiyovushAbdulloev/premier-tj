import classes from './index.module.css'
import {ActorForm} from "src/widgets/ActorForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getActor} from "src/entities/Actor";

const ActorsEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getActor(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <ActorForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default ActorsEditPage
