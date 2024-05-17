import {lazy} from "react";

export const UnauthorizedPageAsync = lazy(async () => await import('./index'))