import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "src/entities/User";
import {StateSchema} from "src/app/providers/Store/config/StateSchema";
import {authReducer} from "src/entities/Auth";
import {roleReducer} from "src/entities/Role";

export function createReduxStore(initialState: StateSchema) {
    const rootReducers = {
        user: userReducer,
        role: roleReducer,
        auth: authReducer,
    }

    return configureStore({
        reducer: rootReducers,
        devTools: true,
        preloadedState: initialState
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
