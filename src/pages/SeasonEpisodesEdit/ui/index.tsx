import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {SeasonEpisodeForm} from "src/widgets/SeasonEpisodeForm";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getSeasonEpisode} from "src/entities/SeasonEpisode";

const SeasonEpisodesEditPage = () => {
    const {slug, seasonId, episodeId} = useParams()
    const [data, setData] = useState(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getSeasonEpisode({
            id: parseInt(episodeId ?? '0'),
            serie: slug ?? '',
            serie_season: parseInt(seasonId ?? '0')
        }))
            .then(data => {
                setData(data.payload)
            })
    }, [])

    return (
        <div className={classes.createPage}>
            <SeasonEpisodeForm type={FormType.EDIT} data={data} />
        </div>
    )
}

export default SeasonEpisodesEditPage
