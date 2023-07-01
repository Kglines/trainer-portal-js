// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './pages/LoginFormPage';
import SignupFormPage from './pages/SignupFormPage';
import HomePage from './pages/HomePage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <Switch>
      <Route path='/' exact>
        <LoginFormPage />
      </Route>
      <Route path='/signup' exact>
        <SignupFormPage />
      </Route>
      <Route path='/home' exact>
        <HomePage />
      </Route>
    </Switch>
  );
}

export default App;
