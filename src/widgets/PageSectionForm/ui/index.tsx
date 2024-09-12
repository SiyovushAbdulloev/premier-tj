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
    getIsFetchingPages,
    getIsStoring,
    getIsUpdating,
    getPages,
    getStoreErrors,
    getUpdateErrors,
    Page,
    PageSection,
    pageSectionActions,
    storePageSection,
    updatePageSection
} from "src/entities/PageSection";
import {getAllSeriesWithoutPagination, getIsFetchingAll as getIsFetchingAllSeries, Series} from "src/entities/Series"
import {Modal} from "src/shared/ui/Modal";
import {Option, SearchableSelect} from "src/shared/ui/SearchableSelect";
import {SelectedOption} from "src/shared/ui/SearchableSelect/ui";
import {getAllMediaContents, getIsFetchingAll, MediaContent} from "src/entities/MediaContent";
import {ReactComponent as Cancel} from "src/shared/assets/icons/cancel_badge.svg"

interface Props {
    type: FormType
    data?: PageSection
}

const Types: {[key: string]: string} = {
    'movie': 'Кино',
    'multimedia': 'Stand up/Новости',
    'series': 'Сериалы',
}

const PageSectionForm = (props: Props) => {
    const [label, setLabel] = useState<string>(props.data ? props.data.label : '')
    const [page, setPage] = useState<string>(props.data ? props.data.page.value : '')
    const [files, setFiles] = useState<Array<MediaContent | Series>>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const [selectedType, setSelectedType] = useState<string>('')
    const [selectedFiles, setSelectedFiles] = useState<Array<{type: string, id: number, name: string}>>(props.data ? props.data.media.map(file => ({id: file.data.id, name: file.data.name, type: file.type})) : [])
    const [pages, setPages] = useState<Array<Page>>([])
    const isFetchingPages = useSelector(getIsFetchingPages)

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
            response  = await dispatch(storePageSection({
                label,
                media: selectedFiles.map(file => ({type: file.type, id: file.id})),
                page,
            }))
        } else {
            response  = await dispatch(updatePageSection({
                id: props.data?.id ?? 0,
                label,
                media: selectedFiles.map(file => ({type: file.type, id: file.id}))
            }))
        }

        if (response.type.includes('fulfilled')) {
            if (props.type === FormType.CREATE) {
                dispatch(pageSectionActions.setStoreErrors(undefined))
            } else {
                dispatch(pageSectionActions.setUpdateErrors(undefined))
            }
            goBack()
        }
    }

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (props.data) {
            setLabel(props.data.label)
            setPage(props.data.page.value)
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
        setSelectedType('')
        setFiles([])
    }

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

    useEffect(() => {
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

    useEffect(() => {
        const fetchPages = async () => {
            const response = await dispatch(getPages())
            if (response.type.includes('fulfilled')) {
                setPages(response.payload)
            }
        }
        fetchPages()
    }, [])

    const onCancel = (position: number) => {
        setSelectedFiles(selectedFiles.filter((file, index) => index !== position))
    }

    const onSelectPage = (option: SelectedOption) => {
        setPage(option.value)
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
                        value={selectedType}
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
                    <div className={className(classes.group, {}, [classes.end])}>
                        <SearchableSelect
                            height={pages.length > 5 ? 220 : null}
                            style={{'width': '50%'}}
                            onSelect={onSelectPage}
                            value={page}
                            placeholder={'Выберите страницу'}
                            loading={isFetchingPages}
                        >
                            {pages.map(page => {
                                return (
                                    <Option
                                        label={page.label}
                                        value={page.value}
                                        key={page.value}
                                    />
                                )
                            })}
                        </SearchableSelect>
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

export default PageSectionForm
