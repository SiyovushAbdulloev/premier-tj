import React, {useEffect} from 'react';
import {className} from 'src/shared/utils/className';
import {AppRouter} from 'src/app/providers/Router'
import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
import {getAuthUser, getCsrfToken} from "src/entities/Auth";
function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const run = async () => {
            const data = await dispatch(getCsrfToken())
            if (data.type.includes('fulfilled')) {
                dispatch(getAuthUser())
            }
        }
        run()
    }, [])
  return (
      <div className={className('app')}>
        <AppRouter />
      </div>
  );
}

export default App;
