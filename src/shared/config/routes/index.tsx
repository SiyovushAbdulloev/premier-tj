import {AdminMainPage} from "src/pages/AdminMain";
import {UnauthorizedPage} from "src/pages/Unauthorized";
import {RouteProps} from "react-router-dom";
import React from "react";
import {ProjectLayouts} from "src/shared/config/layouts";
import {Roles} from "./roles";
import {CountriesPage} from "src/pages/Countries";
import {CountriesCreatePage} from "src/pages/CountriesCreate";
import {CountriesEditPage} from "src/pages/CountriesEdit";
import {MainPage} from "src/pages/Main";
import {AdminLoginPage} from "src/pages/AdminLogin";
import {NotFoundPage} from "src/pages/NotFound";
import {GenresPage} from "src/pages/Genres";
import {GenresCreatePage} from "src/pages/GenresCreate";
import {GenresEditPage} from "src/pages/GenresEdit";
import {ActorsPage} from "src/pages/Actors";
import {ActorsCreatePage} from "src/pages/ActorsCreate";
import {ActorsEditPage} from "src/pages/ActorsEdit";
import {SubscriptionsPage} from "src/pages/Subscriptions";
import {SubscriptionsCreatePage} from "src/pages/SubscriptionsCreate";
import {SubscriptionsEditPage} from "src/pages/SubscriptionsEdit";
import {MoviesPage} from "src/pages/Movies";
import {MoviesCreatePage} from "src/pages/MoviesCreate";
import {MoviesEditPage} from "src/pages/MoviesEdit";
import {MultimediasPage} from "src/pages/Multimedias";
import {MultimediasCreatePage} from "src/pages/MultimediasCreate";
import {MultimediasEditPage} from "src/pages/MultimediasEdit";
import {SeriesPage} from "src/pages/Series";
import {SeriesCreatePage} from "src/pages/SeriesCreate";
import {SeriesEditPage} from "src/pages/SeriesEdit";
import {SerieSeasonsPage} from "src/pages/SerieSeasons";
import {SerieSeasonsCreatePage} from "src/pages/SerieSeasonsCreate";
import {SerieSeasonsEditPage} from "src/pages/SerieSeasonsEdit";
import {SeasonEpisodesPage} from "src/pages/SeasonEpisodes";
import {SeasonEpisodesCreatePage} from "src/pages/SeasonEpisodesCreate";
import {SeasonEpisodesEditPage} from "src/pages/SeasonEpisodesEdit";
import {PageSectionsPage} from "src/pages/PageSections";
import {PageSectionsCreatePage} from "src/pages/PageSectionsCreate";
import {PageSectionsEditPage} from "src/pages/PageSectionsEdit";
import {MoviesShowPage} from "src/pages/MoviesShow";
import {MovieTrailerShowPage} from "src/pages/MovieTrailerShow";
import {SeriesShowPage} from "src/pages/SeriesShow";
import {MoviesListPage} from "src/pages/MoviesList";
import {SeriesListPage} from "src/pages/SeriesList";
import {MultimediasListPage} from "src/pages/MultimediasList";
import {FreeMediaPage} from "src/pages/FreeMedia";
import {MultimediasShowPage} from "src/pages/MultimediasShow";
import {SubscriptionRequestsPage} from "src/pages/SubscriptionRequests";
import {SubscriptionRequestsShowPage} from "src/pages/SubscriptionRequestsShow";

export type RoutesConfigItem = RouteProps & {
    element: React.JSX.Element
    require_auth: boolean
    allow_without_auth: boolean
    layout: ProjectLayouts
    roles: Array<Roles>
    path: string
}

export enum AppRoutes {
    'MAIN' = 'main',
    'ADMIN_MAIN' = 'admin_main',
    'ADMIN_LOGIN' = 'admin_login',
    'ADMIN_COUNTRIES' = 'admin_countries',
    'ADMIN_COUNTRIES_CREATE' = 'admin_countries_create',
    'ADMIN_COUNTRIES_EDIT' = 'admin_countries_edit',
    'ADMIN_GENRES' = 'admin_genres',
    'ADMIN_GENRES_CREATE' = 'admin_genres_create',
    'ADMIN_GENRES_EDIT' = 'admin_genres_edit',
    'ADMIN_ACTORS' = 'admin_actors',
    'ADMIN_ACTORS_CREATE' = 'admin_actors_create',
    'ADMIN_ACTORS_EDIT' = 'admin_actors_edit',
    'ADMIN_SUBSCRIPTIONS' = 'admin_subscriptions',
    'ADMIN_SUBSCRIPTIONS_CREATE' = 'admin_subscriptions_create',
    'ADMIN_SUBSCRIPTIONS_EDIT' = 'admin_subscriptions_edit',
    'ADMIN_MOVIES' = 'admin_movies',
    'ADMIN_MOVIES_CREATE' = 'admin_movies_create',
    'ADMIN_MOVIES_EDIT' = 'admin_movies_edit',
    'ADMIN_MULTIMEDIAS' = 'admin_multimedias',
    'ADMIN_MULTIMEDIAS_CREATE' = 'admin_multimedias_create',
    'ADMIN_MULTIMEDIAS_EDIT' = 'admin_multimedias_edit',
    'ADMIN_SERIES' = 'admin_series',
    'ADMIN_SERIES_CREATE' = 'admin_series_create',
    'ADMIN_SERIES_EDIT' = 'admin_series_edit',
    'ADMIN_SERIE_SEASONS' = 'admin_serie_seasons',
    'ADMIN_SERIE_SEASONS_CREATE' = 'admin_serie_seasons_create',
    'ADMIN_SERIE_SEASONS_EDIT' = 'admin_serie_seasons_edit',
    'ADMIN_SERIE_SEASON_EPISODES' = 'admin_serie_season_episodes',
    'ADMIN_SERIE_SEASON_EPISODES_CREATE' = 'admin_serie_season_episodes_create',
    'ADMIN_SERIE_SEASON_EPISODES_EDIT' = 'admin_serie_season_episodes_edit',
    'ADMIN_PAGE_SECTIONS' = 'admin_page_sections',
    'ADMIN_PAGE_SECTIONS_CREATE' = 'admin_page_sections_create',
    'ADMIN_PAGE_SECTIONS_EDIT' = 'admin_page_sections_edit',
    'MOVIES_LIST' = 'movies_list',
    'MULTIMEDIAS_LIST' = 'multimedias_list',
    'MOVIES_SHOW' = 'movies_show',
    'MOVIE_TRAILER_SHOW' = 'movie_trailer_show',
    'SERIES_LIST' = 'series_list',
    'SERIES_SHOW' = 'series_show',
    'FREE_MEDIA' = 'free_media',
    'MULTIMEDIAS_SHOW' = 'multimedias_show',
    'ADMIN_SUBSCRIPTION_REQUESTS' = 'admin_subscription_requests',
    'ADMIN_SUBSCRIPTION_REQUESTS_SHOW' = 'admin_subscription_requests_show',
    'UNAUTHORIZED' = 'unauthorized',
    'NOT_FOUND' = 'not_found',
}

export const RoutesPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ADMIN_MAIN]: '/admin',
    [AppRoutes.ADMIN_LOGIN]: '/admin/login',
    [AppRoutes.ADMIN_COUNTRIES]: '/admin/countries',
    [AppRoutes.ADMIN_COUNTRIES_CREATE]: '/admin/countries/create',
    [AppRoutes.ADMIN_COUNTRIES_EDIT]: '/admin/countries/:id/edit',
    [AppRoutes.ADMIN_GENRES]: '/admin/genres',
    [AppRoutes.ADMIN_GENRES_CREATE]: '/admin/genres/create',
    [AppRoutes.ADMIN_GENRES_EDIT]: '/admin/genres/:id/edit',
    [AppRoutes.ADMIN_ACTORS]: '/admin/actors',
    [AppRoutes.ADMIN_ACTORS_CREATE]: '/admin/actors/create',
    [AppRoutes.ADMIN_ACTORS_EDIT]: '/admin/actors/:id/edit',
    [AppRoutes.ADMIN_SUBSCRIPTIONS]: '/admin/subscriptions',
    [AppRoutes.ADMIN_SUBSCRIPTIONS_CREATE]: '/admin/subscriptions/create',
    [AppRoutes.ADMIN_SUBSCRIPTIONS_EDIT]: '/admin/subscriptions/:id/edit',
    [AppRoutes.ADMIN_MOVIES]: '/admin/movies',
    [AppRoutes.ADMIN_MOVIES_CREATE]: '/admin/movies/create',
    [AppRoutes.ADMIN_MOVIES_EDIT]: '/admin/movies/:id/edit',
    [AppRoutes.ADMIN_MULTIMEDIAS]: '/admin/multimedias',
    [AppRoutes.ADMIN_MULTIMEDIAS_CREATE]: '/admin/multimedias/create',
    [AppRoutes.ADMIN_MULTIMEDIAS_EDIT]: '/admin/multimedias/:id/edit',
    [AppRoutes.ADMIN_SERIES]: '/admin/series',
    [AppRoutes.ADMIN_SERIES_CREATE]: '/admin/series/create',
    [AppRoutes.ADMIN_SERIES_EDIT]: '/admin/series/:id/edit',
    [AppRoutes.ADMIN_SERIE_SEASONS]: '/admin/series/:id/serie-seasons',
    [AppRoutes.ADMIN_SERIE_SEASONS_CREATE]: '/admin/series/:id/serie-seasons/create',
    [AppRoutes.ADMIN_SERIE_SEASONS_EDIT]: '/admin/series/:id/serie-seasons/:seasonId/edit',
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES]: '/admin/series/:id/serie-seasons/:seasonId/season-episodes',
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES_CREATE]: '/admin/series/:id/serie-seasons/:seasonId/season-episodes/create',
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES_EDIT]: '/admin/series/:id/serie-seasons/:seasonId/season-episodes/:episodeId/edit',
    [AppRoutes.ADMIN_PAGE_SECTIONS]: '/admin/sections',
    [AppRoutes.ADMIN_PAGE_SECTIONS_CREATE]: '/admin/sections/create',
    [AppRoutes.ADMIN_PAGE_SECTIONS_EDIT]: '/admin/sections/:id/edit',
    [AppRoutes.MOVIES_LIST]: '/movies',
    [AppRoutes.MULTIMEDIAS_LIST]: '/shows',
    [AppRoutes.MOVIES_SHOW]: '/movies/:id/show',
    [AppRoutes.MOVIE_TRAILER_SHOW]: '/movies/:id/trailer',
    [AppRoutes.SERIES_LIST]: '/series',
    [AppRoutes.SERIES_SHOW]: '/series/:id/show',
    [AppRoutes.FREE_MEDIA]: '/free',
    [AppRoutes.MULTIMEDIAS_SHOW]: '/shows/:id/show',
    [AppRoutes.ADMIN_SUBSCRIPTION_REQUESTS]: '/admin/subscription-requests',
    [AppRoutes.ADMIN_SUBSCRIPTION_REQUESTS_SHOW]: '/admin/subscription-requests/:id/show',
    [AppRoutes.UNAUTHORIZED]: '/unauthorized',
    [AppRoutes.NOT_FOUND]: '*',
}

export const RoutesConfig: Record<AppRoutes, RoutesConfigItem> = {
    [AppRoutes.MAIN]: {
        path: RoutesPath.main,
        element: <MainPage/>,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: []
    },
    [AppRoutes.ADMIN_MAIN]: {
        path: RoutesPath.admin_main,
        element: <AdminMainPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_LOGIN]: {
        path: RoutesPath.admin_login,
        element: <AdminLoginPage/>,
        require_auth: false,
        allow_without_auth: true,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
    [AppRoutes.ADMIN_COUNTRIES]: {
        path: RoutesPath.admin_countries,
        element: <CountriesPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_COUNTRIES_CREATE]: {
        path: RoutesPath.admin_countries_create,
        element: <CountriesCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_COUNTRIES_EDIT]: {
        path: RoutesPath.admin_countries_edit,
        element: <CountriesEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_GENRES]: {
        path: RoutesPath.admin_genres,
        element: <GenresPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_GENRES_CREATE]: {
        path: RoutesPath.admin_genres_create,
        element: <GenresCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_GENRES_EDIT]: {
        path: RoutesPath.admin_genres_edit,
        element: <GenresEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_ACTORS]: {
        path: RoutesPath.admin_actors,
        element: <ActorsPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_ACTORS_CREATE]: {
        path: RoutesPath.admin_actors_create,
        element: <ActorsCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_ACTORS_EDIT]: {
        path: RoutesPath.admin_actors_edit,
        element: <ActorsEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SUBSCRIPTIONS]: {
        path: RoutesPath.admin_subscriptions,
        element: <SubscriptionsPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SUBSCRIPTIONS_CREATE]: {
        path: RoutesPath.admin_subscriptions_create,
        element: <SubscriptionsCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SUBSCRIPTIONS_EDIT]: {
        path: RoutesPath.admin_subscriptions_edit,
        element: <SubscriptionsEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MOVIES]: {
        path: RoutesPath.admin_movies,
        element: <MoviesPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MOVIES_CREATE]: {
        path: RoutesPath.admin_movies_create,
        element: <MoviesCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MOVIES_EDIT]: {
        path: RoutesPath.admin_movies_edit,
        element: <MoviesEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MULTIMEDIAS]: {
        path: RoutesPath.admin_multimedias,
        element: <MultimediasPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MULTIMEDIAS_CREATE]: {
        path: RoutesPath.admin_multimedias_create,
        element: <MultimediasCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_MULTIMEDIAS_EDIT]: {
        path: RoutesPath.admin_multimedias_edit,
        element: <MultimediasEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIES]: {
        path: RoutesPath.admin_series,
        element: <SeriesPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIES_CREATE]: {
        path: RoutesPath.admin_series_create,
        element: <SeriesCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIES_EDIT]: {
        path: RoutesPath.admin_series_edit,
        element: <SeriesEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASONS]: {
        path: RoutesPath.admin_serie_seasons,
        element: <SerieSeasonsPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASONS_CREATE]: {
        path: RoutesPath.admin_serie_seasons_create,
        element: <SerieSeasonsCreatePage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASONS_EDIT]: {
        path: RoutesPath.admin_serie_seasons_edit,
        element: <SerieSeasonsEditPage/>,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES]: {
        path: RoutesPath.admin_serie_season_episodes,
        element: <SeasonEpisodesPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES_CREATE]: {
        path: RoutesPath.admin_serie_season_episodes_create,
        element: <SeasonEpisodesCreatePage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SERIE_SEASON_EPISODES_EDIT]: {
        path: RoutesPath.admin_serie_season_episodes_edit,
        element: <SeasonEpisodesEditPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_PAGE_SECTIONS]: {
        path: RoutesPath.admin_page_sections,
        element: <PageSectionsPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_PAGE_SECTIONS_CREATE]: {
        path: RoutesPath.admin_page_sections_create,
        element: <PageSectionsCreatePage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_PAGE_SECTIONS_EDIT]: {
        path: RoutesPath.admin_page_sections_edit,
        element: <PageSectionsEditPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.MOVIES_SHOW]: {
        path: RoutesPath.movies_show,
        element: <MoviesShowPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.MOVIES_LIST]: {
        path: RoutesPath.movies_list,
        element: <MoviesListPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.MULTIMEDIAS_LIST]: {
        path: RoutesPath.multimedias_list,
        element: <MultimediasListPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.SERIES_LIST]: {
        path: RoutesPath.series_list,
        element: <SeriesListPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.MOVIE_TRAILER_SHOW]: {
        path: RoutesPath.movie_trailer_show,
        element: <MovieTrailerShowPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.NoLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.SERIES_SHOW]: {
        path: RoutesPath.series_show,
        element: <SeriesShowPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.FREE_MEDIA]: {
        path: RoutesPath.free_media,
        element: <FreeMediaPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.MULTIMEDIAS_SHOW]: {
        path: RoutesPath.multimedias_show,
        element: <MultimediasShowPage />,
        require_auth: true,
        allow_without_auth: true,
        layout: ProjectLayouts.AppLayout,
        roles: [Roles.USER, Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SUBSCRIPTION_REQUESTS]: {
        path: RoutesPath.admin_subscription_requests,
        element: <SubscriptionRequestsPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.ADMIN_SUBSCRIPTION_REQUESTS_SHOW]: {
        path: RoutesPath.admin_subscription_requests_show,
        element: <SubscriptionRequestsShowPage />,
        require_auth: true,
        allow_without_auth: false,
        layout: ProjectLayouts.AdminLayout,
        roles: [Roles.ADMIN]
    },
    [AppRoutes.UNAUTHORIZED]: {
        path: RoutesPath.unauthorized,
        element: <UnauthorizedPage/>,
        require_auth: false,
        allow_without_auth: false,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutesPath.not_found,
        element: <NotFoundPage/>,
        require_auth: false,
        allow_without_auth: false,
        layout: ProjectLayouts.AuthLayout,
        roles: []
    },
}
