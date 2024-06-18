import {lazy} from "react";

export const MoviesShowPageAsync = lazy(async () => await import('./index'))
