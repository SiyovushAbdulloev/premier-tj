import classes from './index.module.css'
import {FormType} from "src/shared/constants/formType";
import {TextField} from "src/shared/ui/TextField";
import React, {useEffect, useState} from "react";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {ReactComponent as Loading} from "src/shared/assets/icons/loading.svg";
import {ReactComponent as Fetching} from "src/shared/assets/icons/loading_admin.svg";
import {className} from "src/shared/utils/className";
import {
    getIsFetchingOne,
    getIsStoring,
    getIsUpdating,
    getStoreErrors, getUpdateErrors,
    MainPageSection, mainPageSectionActions, storeMainPageSection, updateMainPageSection
} from "src/entities/MainPageSection";
import {getIsFetchingAll as getIsFetchingAllSeries} from "src/entities/Series"
import {Modal} from "src/shared/ui/Modal";
import {Option, SearchableSelect} from "src/shared/ui/SearchableSelect";
import {SelectedOption} from "src/shared/ui/SearchableSelect/ui";
import {getAllMediaContents, getIsFetchingAll, MediaContent} from "src/entities/MediaContent";
import {getAllSeriesWithoutPagination, Series} from "src/entities/Series";
import {ReactComponent as Cancel} from "src/shared/assets/icons/cancel_badge.svg"

interface Props {
    type: FormType
    data?: MainPageSection
}

const Types: {[key: string]: string} = {
    'movie': 'Кино',
    'multimedia': 'Stand up/Новости',
    'series': 'Сериалы',
}

const MainPageSectionForm = (props: Props) => {
    console.log("Data:", props.data)
    const [label, setLabel] = useState<string>(props.data ? props.data.label : '')
    const [files, setFiles] = useState<Array<MediaContent | Series>>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedFiles, setSelectedFiles] = useState<Array<{type: string, id: number, name: string}>>(props.data ? props.data.media.map(file => ({id: file.data.id, name: file.data.name, type: file.type})) : [])

    const dispatch = useAppDispatch()
    const isStoring = useSelector(getIsStoring)
    const isUpdating = useSelector(getIsUpdating)
    const isFetchingOne = useSelector(getIsFetchingOne)
    const isFetchingAllMediaContent = useSelector(getIsFetchingAll)
    const isFetchingAllSeries = useSelector(getIsFetchingAllSeries)
    const errors = useSelector(getStoreErrors)
    const updateErrors = useSelector(getUpdateErrors)
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let response

        if (props.type === FormType.CREATE) {
            response  = await dispatch(storeMainPageSection({
                label,
                media: selectedFiles.map(file => ({type: file.type, id: file.id}))
            }))
        } else {
            response  = await dispatch(updateMainPageSection({
                id: props.data?.id ?? 0,
                label,
                media: selectedFiles.map(file => ({type: file.type, id: file.id}))
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(mainPageSectionActions.setStoreErrors(undefined))
            } else {
                dispatch(mainPageSectionActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const goBack = () => {
        navigate(RoutesConfig.admin_main_page_sections.path)
    }

    useEffect(() => {
        if (props.data) {
            setLabel(props.data.label)
            setSelectedFiles(props.data.media.map(file => ({id: file.data.id, name: file.data.name, type: file.type})))
        }
    }, [props.data])

    const onChangeModal = (value: boolean) => {
        setShowModal(value)
    }

    const onSelectType = (option: SelectedOption) => {
        setSelectedType(option.value)
    }

    const onSelectFile = (option: SelectedOption) => {
        let exists = false
        selectedFiles.forEach(file => {
            if (file.type === selectedType) {
                if (file.id === option.value) {
                    exists = true
                }
            }
        })
        if (!exists) {
            setSelectedFiles([...selectedFiles, {
                type: selectedType,
                id: option.value,
                name: option.label
            }])
        }
        setShowModal(false)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await dispatch(getAllMediaContents({type: 2}))
            if (data.type.includes('fulfilled')) {
                setFiles(data.payload.data)
            }
        }
        const fetchMultimedias = async () => {
            const data = await dispatch(getAllMediaContents({type: 1}))
            if (data.type.includes('fulfilled')) {
                setFiles(data.payload.data)
            }
        }
        const fetchSeries = async () => {
            const data = await dispatch(getAllSeriesWithoutPagination())
            if (data.type.includes('fulfilled')) {
                setFiles(data.payload.data)
            }
        }
        switch (selectedType) {
            case 'movie':
                fetchMovies()
                break
            case 'multimedia':
                fetchMultimedias()
                break
            case 'series':
                fetchSeries()
                break
        }
    }, [selectedType])

    const onCancel = (position: number) => {
        setSelectedFiles(selectedFiles.filter((file, index) => index !== position))
    }

    return (
        <form
            className={classes.countryForm}
            onSubmit={onSubmit}
        >
            <Modal
                value={showModal}
                onChange={onChangeModal}
            >
                <div className={classes.group}>
                    <SearchableSelect
                        height={220}
                        style={{'width': '50%'}}
                        onSelect={onSelectType}
                        value={''}
                        placeholder={'Выберите тип контента:кино,сериалы...'}
                    >
                        {Object.keys(Types).map(type => {
                            return (
                                <Option
                                    label={Types[type]}
                                    value={type}
                                    key={type}
                                />
                            )
                        })}
                    </SearchableSelect>
                    <SearchableSelect
                        height={files.length > 5 ? 300 : null}
                        style={{'width': '50%'}}
                        onSelect={onSelectFile}
                        value={''}
                        placeholder={'Выберите файл...'}
                        loading={isFetchingAllMediaContent || isFetchingAllSeries}
                    >
                        {files.map(file => {
                            return (
                                <Option
                                    label={file.name}
                                    value={file.id}
                                    key={file.id}
                                />
                            )
                        })}
                    </SearchableSelect>
                </div>
            </Modal>
            {isFetchingOne ? (
                <Fetching className={classes.fetching} />
                ) : (
                <>
                    <div className={className(classes.group, {}, [classes.end])}>
                        <TextField
                            style={{'width': '90%'}}
                            id={'label'}
                            onChange={(value: string) => setLabel(value)}
                            value={label}
                            label={'Наименование'}
                            placeholder={'Премьеры месяца'}
                        />
                    </div>
                    {selectedFiles.length ? (
                        <div className={classes.badges}>
                            {selectedFiles.map((file, index) => {
                                return (
                                    <span
                                        key={file.type + file.id}
                                        className={classes.badge}
                                    >
                                        {file.name}
                                        <Cancel
                                            className={classes.cancel}
                                            onClick={() => onCancel(index)}
                                        />
                                    </span>
                                )
                            })}
                        </div>
                    ) : null}
                    <button
                        type={"button"}
                        onClick={() => setShowModal(true)}
                        className={classes.formAction}
                    >
                        Добавить фильм/сериал/новости/standup
                    </button>
                    {errors && Object.keys(errors).map((key: string) => {
                        return (
                            <div key={key}>
                                {errors[key].map((message: string) => {
                                    return (
                                        <p
                                            key={message}
                                            className={classes.error}
                                        >
                                            {message}
                                        </p>
                                    )
                                })}
                            </div>
                        )
                    })}
                    {updateErrors && Object.keys(updateErrors).map((key: string) => {
                        return (
                            <div key={key}>
                                {updateErrors[key].map((message: string) => {
                                    return (
                                        <p
                                            key={message}
                                            className={classes.error}
                                        >
                                            {message}
                                        </p>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className={classes.actions}>
                        <button
                            className={classes.formAction}
                            onClick={goBack}
                        >
                            Назад
                        </button>
                        <button className={classes.formAction}>
                            {(isStoring || isUpdating) ? <Loading width={24} height={24} /> : props.type === FormType.CREATE ? 'Создать' : 'Изменить'}
                        </button>
                    </div>
                </>
            )}
        </form>
    )
}

export default MainPageSectionForm
