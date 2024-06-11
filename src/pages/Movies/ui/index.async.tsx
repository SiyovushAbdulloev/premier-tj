import {lazy} from "react";

export const MoviesPageAsync = lazy(async () => await import('./index'))
