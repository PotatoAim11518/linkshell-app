// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from '../src/components/LoginFormPage';
import SignupFormPage from '../src/components/SignupFormPage';
import Navigation from '../src/components/Navigation';
import GroupsList from '../src/components/GroupsList';
import Homepage from '../src/components/Homepage';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage isLoaded={isLoaded}/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
