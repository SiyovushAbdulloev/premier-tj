import classes from './index.module.css'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading.svg'
import {useNavigate, useParams} from "react-router-dom";
import {getIsFetchingMovie, getMovie, MediaContent} from "src/entities/MediaContent";
import {ReactComponent as Back} from "src/shared/assets/icons/back.svg"
// import ReactPlayer from 'ReactPlayer'

const MovieTrailerShowPage = () => {
    const dispatch = useAppDispatch()
    const fetching = useSelector(getIsFetchingMovie)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MediaContent | undefined>(undefined)

    useEffect(() => {
        dispatch(getMovie(slug ?? ''))
            .then(data => {
                setMovie(data.payload)
            })
    }, [])

    const onBack = () => {
        navigate(-1)
    }

    return (
        <div className={classes.trailerPage}>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <button
                            className={classes.back}
                            onClick={onBack}
                        >
                            <Back width={28} height={28} />
                        </button>
                        <div className={classes.player}>
                            {/*<ReactPlayer*/}
                            {/*    width={'100%'}*/}
                            {/*    height={'100%'}*/}
                            {/*    url={movie?.trailer ?? ''}*/}
                            {/*    controls={true}*/}
                            {/*/>*/}
                        </div>
                    </>
            )}
        </div>
    )
}

export default MovieTrailerShowPage
