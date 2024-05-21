import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "src/entities/User";
import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {authReducer} from "src/entities/Auth";
import {roleReducer} from "src/entities/Role";
import {countryReducer} from "src/entities/Country";
import {genreReducer} from "src/entities/Genre";
import {actorReducer} from "src/entities/Actor";

export function createReduxStore(initialState: StateSchema) {
    const rootReducers = {
        user: userReducer,
        role: roleReducer,
        auth: authReducer,
        country: countryReducer,
        genre: genreReducer,
        actor: actorReducer
    }

    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
