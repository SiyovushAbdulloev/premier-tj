import classes from './index.module.css'
import {Table, TableColumn} from "src/shared/ui/Table";
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ReactComponent as Fetching} from 'src/shared/assets/icons/loading_admin.svg'
import {ReactComponent as Plus} from 'src/shared/assets/icons/plus.svg'
import {useNavigate} from "react-router-dom";
import {RoutesConfig} from "src/shared/config/routes";
import {
    destroyMainPageSection,
    getData,
    getFetching,
    getMainPageSections,
    MainPageSection
} from "src/entities/MainPageSection";

const MainPageSectionsPage = () => {
    const dispatch = useAppDispatch()
    const sections = useSelector(getData)
    const fetching = useSelector(getFetching)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getMainPageSections())
    }, [])

    const fetchSections = () => {
        // @ts-ignore
        dispatch(getMainPageSections())
    }

    const onCreate = () => {
        navigate(RoutesConfig.admin_main_page_sections_create.path)
    }

    const onEdit = (id: number) => {
        navigate(RoutesConfig.admin_main_page_sections_edit.path.replace(':id', `${id}`))
    }

    const onDestroy = (id: number) => {
        if (window.confirm('Вы действительно хотите удалить эту категорию?')) {
            dispatch(destroyMainPageSection(id))
                .then(data => {
                    fetchSections()
                })
        }
    }
    console.log({sections})
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
                                label={'Файлы'}
                                prop={'media'}
                                row={(data: any) => {
                                    return (
                                        <div className={classes.badges}>
                                            {data.media.map((file: any) => {
                                                return (
                                                    <span
                                                        key={file.data.name}
                                                        className={classes.badge}
                                                    >
                                                        {file.data.name}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )
                                }}
                            />
                            <TableColumn
                                label={'Действия'}
                                prop={''}
                                row={(data: MainPageSection) => {
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

export default MainPageSectionsPage
