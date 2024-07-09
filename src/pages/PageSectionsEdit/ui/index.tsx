import classes from './index.module.css'
import {PageSectionForm} from "src/widgets/PageSectionForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getPageSection} from "src/entities/PageSection";

const PageSectionsEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getPageSection(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <PageSectionForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default PageSectionsEditPage
