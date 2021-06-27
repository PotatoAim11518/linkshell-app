// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import LoginFormPage from '../src/components/LoginFormPage';
import SignupFormPage from '../src/components/SignupFormPage';
import Navigation from '../src/components/Navigation';
import GroupsList from '../src/components/GroupsList';
import EventsList from '../src/components/EventsList';
import Homepage from '../src/components/Homepage';
import DiscoverNav from '../src/components/DiscoverNav';
import GroupPage from '../src/components/GroupPage';
import EventPage from '../src/components/EventPage';
import CreateGroupForm from '../src/components/GroupCreation';
import CreateEventForm from './components/EventCreationForm';
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
            <Helmet><title>Welcome to Linkshell!</title></Helmet>
            <Homepage isLoaded={isLoaded}/>
          </Route>
          <Route path="/login">
            <Helmet><title>Linkshell | Log In</title></Helmet>
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <Helmet><title>Linkshell | Sign Up</title></Helmet>
            <SignupFormPage />
          </Route>
          <Route exact path='/groups/create'>
            <Helmet><title>Linkshell | Create a group</title></Helmet>
            <CreateGroupForm />
          </Route>
          <Route path="/groups/:id">
            <GroupPage />
          </Route>
          <Route path='/discover/groups'>
            <Helmet><title>Linkshell | Discover groups</title></Helmet>
            <DiscoverNav/>
            <GroupsList />
          </Route>
          <Route path='/discover/events'>
            <Helmet><title>Linkshell | Discover events</title></Helmet>
            <DiscoverNav/>
            <EventsList />
          </Route>
          <Route path='/events/create'>
            <Helmet><title>Linkshell | Create an event</title></Helmet>
            <CreateEventForm />
          </Route>
          <Route path='/events/:eventId'>
            <EventPage />
          </Route>
          <Route>
            <h1>Resource not Found</h1>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
