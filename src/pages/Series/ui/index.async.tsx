import {lazy} from "react";

export const SeriesPageAsync = lazy(async () => await import('./index'))
