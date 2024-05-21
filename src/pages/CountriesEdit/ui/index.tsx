import classes from './index.module.css'
import {CountryForm} from "src/widgets/CountryForm";
import {FormType} from "src/shared/constants/formType";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getCountry} from "src/entities/Country";

const CountriesEditPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getCountry(id))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.editPage}>
            <CountryForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default CountriesEditPage
