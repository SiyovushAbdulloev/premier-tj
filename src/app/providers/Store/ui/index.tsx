import React from "react";
import {Provider} from "react-redux";
import {createReduxStore} from "src/app/providers/Store/config";

interface StoreProviderProps extends React.PropsWithChildren {
    initialState?: any
}
const StoreProvider = (props: StoreProviderProps) => {
    const store = createReduxStore(props.initialState)

    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    )
}

export default StoreProvider