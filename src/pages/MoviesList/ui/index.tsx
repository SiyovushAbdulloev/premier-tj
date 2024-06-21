import classes from './index.module.css'
import {useSelector} from "react-redux";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useState} from "react";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading.svg"
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {getAllMovies, getIsFetchingAllMovies, MediaContent} from "src/entities/MediaContent";
import {ReactComponent as Play} from "src/shared/assets/icons/play.svg"
import {SelectContainer, Option, SelectedOption, CheckboxOption} from "src/shared/ui/SelectContainer";
import {className} from "src/shared/utils/className";

const MoviesListPage = () => {
    const navigate = useNavigate()
    const isFetchingMovies = useSelector(getIsFetchingAllMovies)
    const [movies, setMovies] = useState<Array<MediaContent>>([])
    const dispatch = useAppDispatch()
    const [hovered, setHovered] = useState<number>(0)
    const [free, setFree] = useState<boolean>(false)
    const [hoveredFree, setHoveredFree] = useState<boolean>(false)

    useEffect(() => {
        const fetchSections = async () => {
            const data = await dispatch(getAllMovies())
            if (data.type.includes('fulfilled')) {
                console.log({data})
                setMovies(data.payload)
            }
        }
        fetchSections()
    }, [])

    const onHover = (id: number) => {
        setHovered(id)
    }

    const onUnHover = () => {
        setHovered(0)
    }

    const onPage = (item: MediaContent) => {
        navigate(RoutesConfig.movies_show.path.replace(':id', `${item.id}`))
    }

    const onOptionSelect = (option: SelectedOption) => {
        console.log({option})
    }

    const onCheckboxSelect = (option: SelectedOption) => {
        console.log({option})
    }

    const onFree = () => {
        console.log({free})
        setFree(!free)
    }

    const onFreeEnter = () => {
        setHoveredFree(true)
    }

    const onFreeLeave = () => {
        setHoveredFree(false)
    }

    return (
        <div className={classes.mainPage} style={{height: isFetchingMovies ? '700px' : 'fit-content'}}>
            {isFetchingMovies ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <div className={classes.pageWrapper}>
                        <h1 className={classes.pageTitle}>Фильмы смотреть онлайн</h1>
                        <div className={classes.filters}>
                            <div className={classes.badge}>Зарубежные фильмы</div>
                            <div className={classes.badge}>Российские фильмы</div>
                            <div className={classes.badge}>Таджикские фильмы</div>
                            <div className={classes.badge}>Фильмы 2023</div>
                            <div className={classes.badge}>Фильмы 2022</div>
                            {/*<Select*/}
                            {/*    placeholder={'Категория'}*/}
                            {/*    onSelect={onCategory}*/}
                            {/*    value={''}*/}
                            {/*    style={{width: '242px'}}*/}
                            {/*>*/}
                            {/*    <Option label={'Фильмы'} value={'movie'} />*/}
                            {/*    <Option label={'Сериалы'} value={'series'} />*/}
                            {/*    <Option label={'Шоу'} value={'multimedia'} />*/}
                            {/*</Select>*/}
                            <SelectContainer
                                onOptionSelect={onOptionSelect}
                                onCheckboxSelect={onCheckboxSelect}
                                value={'comedy'}
                                placeholder={'Жанр'}
                                style={{width: '242px'}}
                            >
                                <Option label={'Все'} value={'all'} />
                                <CheckboxOption label={'Комедия'} value={'comedy'} />
                                <CheckboxOption label={'Приключения'} value={'adventure'} />
                                <CheckboxOption label={'Аниме'} value={'anime'} />
                                <CheckboxOption label={'Аниме1'} value={'anime1'} />
                                <CheckboxOption label={'Аниме2'} value={'anime2'} />
                            </SelectContainer>
                            <SelectContainer
                                onOptionSelect={onOptionSelect}
                                onCheckboxSelect={onCheckboxSelect}
                                value={'tajikistan'}
                                placeholder={'Страна'}
                                style={{width: '242px'}}
                            >
                                <Option label={'Все'} value={'all'} />
                                <CheckboxOption label={'Таджикистан'} value={'tajikistan'} />
                                <CheckboxOption label={'Россия'} value={'russia'} />
                                <CheckboxOption label={'США'} value={'usa'} />
                                <CheckboxOption label={'Канада'} value={'canada'} />
                                <CheckboxOption label={'Франция'} value={'france'} />
                                <CheckboxOption label={'Турция'} value={'turkey'} />
                            </SelectContainer>
                            <SelectContainer
                                onOptionSelect={onOptionSelect}
                                onCheckboxSelect={onCheckboxSelect}
                                value={'comedy'}
                                placeholder={'Год'}
                                style={{width: '242px'}}
                            >
                                <Option label={'Все'} value={'all'} />
                                <CheckboxOption label={'2024'} value={'2024'} />
                                <CheckboxOption label={'2023'} value={'2023'} />
                                <CheckboxOption label={'2022'} value={'2022'} />
                                <CheckboxOption label={'2021'} value={'2021'} />
                                <CheckboxOption label={'2020'} value={'2020'} />
                                <CheckboxOption label={'2019'} value={'2019'} />
                                <CheckboxOption label={'2018'} value={'2018'} />
                                <CheckboxOption label={'2017'} value={'2017'} />
                                <CheckboxOption label={'2016'} value={'2016'} />
                                <CheckboxOption label={'2015'} value={'2015'} />
                                <CheckboxOption label={'2014'} value={'2014'} />
                                <CheckboxOption label={'2013'} value={'2013'} />
                                <CheckboxOption label={'2012'} value={'2012'} />
                            </SelectContainer>
                            <div
                                className={classes.free}
                                onClick={onFree}
                            >
                                <div
                                    className={className(classes.checkbox, {
                                        [classes.activeCheckbox]: free,
                                        [classes.hoveredCheckbox]: hoveredFree,
                                    })}
                                    onMouseEnter={onFreeEnter}
                                    onMouseLeave={onFreeLeave}
                                >
                                    <svg
                                        width={18}
                                        height={18}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </div>
                                Бесплатно
                            </div>
                        </div>
                        <div className={classes.sections}>
                            {movies.map((item, index) => {
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => onPage(item)}
                                        className={classes.section}
                                    >
                                        <img
                                            src={item.poster}
                                            alt="Poster"
                                            className={classes.contentImg}
                                            onMouseEnter={() => onHover(item.id)}
                                            onMouseLeave={onUnHover}
                                        />
                                        <button
                                            type={'button'}
                                            className={classes.playBtn}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                            <Play className={classes.playIcon} />
                                        </button>
                                        <span
                                            className={classes.contentLabel}
                                            style={{opacity: hovered === item.id ? '1' : '0'}}
                                        >
                                        <span className={classes.contentName}>{item.name}</span>
                                        <span className={classes.contentGenre}>/ {item.genres.map(genre => genre.name).join(',')}</span>
                                    </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MoviesListPage
