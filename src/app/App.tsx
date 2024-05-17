import React, {useEffect} from 'react';
import {className} from 'src/shared/utils/className';
import {AppRouter} from 'src/app/providers/Router'
// import {useAppDispatch} from "src/shared/hooks/useAppDispatch";
// import {roleActions} from "src/entities/Role";
function App() {
    // const dispath = useAppDispatch()
//TODO: only after fetching roles(with related permissions) continue rendering
    // useEffect(() => {
    //     dispath(roleActions.setRoles([]))
    // }, [])
  return (
      <div className={className('app')}>
        <AppRouter />
      </div>
  );
}

export default App;
