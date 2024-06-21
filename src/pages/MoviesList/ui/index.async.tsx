import {lazy} from "react";

export const MoviesListPageAsync = lazy(async () => await import('./index'))
