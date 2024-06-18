import {lazy} from "react";

export const MovieTrailerShowPageAsync = lazy(async () => await import('./index'))
