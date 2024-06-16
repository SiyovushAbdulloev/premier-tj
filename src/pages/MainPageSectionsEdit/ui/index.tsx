import classes from './index.module.css'
import {MainPageSectionForm} from "src/widgets/MainPageSectionForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getMainPageSection} from "src/entities/MainPageSection";

const MainPageSectionsEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getMainPageSection(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <MainPageSectionForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default MainPageSectionsEditPage
