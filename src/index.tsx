import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/app/styles/index.css';
import App from 'src/app/App';
import {ErrorBoundary} from 'src/app/providers/ErrorBoundary';
import {BrowserRouter} from 'react-router-dom';
import {StoreProvider} from 'src/app/providers/Store'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <StoreProvider>
            <BrowserRouter>
                <ErrorBoundary>
                    <App/>
                </ErrorBoundary>
            </BrowserRouter>
        </StoreProvider>
    </React.StrictMode>
);
