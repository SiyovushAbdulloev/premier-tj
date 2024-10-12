import React, {useEffect, useState} from 'react';
import {className} from 'src/shared/utils/className';
import {AppRouter} from 'src/app/providers/Router'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getAuthUser, getCsrfToken} from "src/entities/Auth";
import {Toaster} from "react-hot-toast";
function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCsrfToken());
            await dispatch(getAuthUser());
            setLoading(false);
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        // Optionally, you can return a loading indicator here
        return <div>Loading...</div>;
    }

  return (
      <div className={className('app')}>
        <AppRouter />
        <Toaster />
      </div>
  );
}

export default App;
