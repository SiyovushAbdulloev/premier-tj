import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {useNavigate, useSearchParams} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroyPageSection,
    getData,
    getFetching, getIsFetchingPages, getPages,
    getPageSections, getPagination, Page,
    PageSection
} from "src/entities/PageSection";
import {Option, SearchableSelect} from "src/shared/ui/SearchableSelect";
import {SelectedOption} from "src/shared/ui/SearchableSelect/ui";

const PageSectionsPage = () => {
    const dispatch = useAppDispatch()
    const sections = useSelector(getData)
    const pagination = useSelector(getPagination)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [pages, setPages] = useState<Array<Page>>([])
    const [page, setPage] = useState<string>('')
    const isFetchingPages = useSelector(getIsFetchingPages)

    useEffect(() => {
        dispatch(getPageSections({
            page: parseInt(searchParams.get('page') ?? '1'),
            page_slug: searchParams.get('p') ?? ''
        }))
        const fetchPages = async () => {
            const response = await dispatch(getPages())
            if (response.type.includes('fulfilled')) {
                setPages(response.payload)
            }
        }
        fetchPages()
    }, [])

    const fetchSections = (value: number) => {
        // @ts-ignore
        dispatch(getPageSections({page: value}))
        setSearchParams({'page': value + ''})
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_page_sections_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_page_sections_edit.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить эту категорию?')) {
            dispatch(destroyPageSection(id))
                .then(data => {
                    fetchSections(pagination.current_page)
                })
        }
    }

    const onSelectPage = (option: SelectedOption) => {
        dispatch(getPageSections({
            page: pagination.current_page,
            page_slug: option.value
        }))
        setSearchParams({'p': option.value + ''})
    }

    return (
        <div className={classes.actorsPage}>
            <h1 className={classes.pageTitle}>Категории</h1>
            {fetching ? (
                <>
                    <Fetching className={classes.fetching} />
                </>
                ) : (
                    <>
                        <header className={classes.pageHeader}>
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
                            <button
                                className={classes.createModel}
                                onClick={onCreate}
                            >
                                <Plus width={24} height={24} />
                                Добавить категорию
                            </button>
                        </header>
                        <Table
                            style={{
                                'width': '100%',
                                'marginTop': '30px'
                            }}
                            data={sections}
                            pagination={pagination}
                            onChangePage={fetchSections}
                        >
                            <TableColumn
                                label={'Идентификатор'}
                                prop={'id'}
                            />
                            <TableColumn
                                label={'Наименование'}
                                prop={'label'}
                            />
                            <TableColumn
                                label={'Страница'}
                                prop={'page'}
                                row={(data: PageSection) => {
                                    return (
                                        <span className={classes.badge}>
                                            {data.page.label}
                                        </span>
                                    )
                                }}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data: PageSection) => {
                                    return (
                                        <div className={classes.tableActions}>
                                            <button
                                                className={classes.createModel}
                                                onClick={() => onEdit(data.id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className={classes.destroy}
                                                onClick={() => onDestroy(data.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )
                                }}
                            />
                        </Table>
                    </>
            )}
        </div>
    )
}

export default PageSectionsPage
