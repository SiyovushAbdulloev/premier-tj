import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SocialLinkForm} from "src/widgets/SocialLinkForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getLink} from "src/entities/SocialLink";

const SocialLinksEditPage = () => {
    const {name} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getLink(name))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <SocialLinkForm type={FormType.EDIT} data={data}/>
        </div>
    )
}

export default SocialLinksEditPage
