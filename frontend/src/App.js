// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './pages/LoginFormPage';
import SignupFormPage from './pages/SignupFormPage';
import HomePage from './pages/HomePage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import ClientsPage from './pages/ClientsPage';
import ReportsPage from './pages/ReportsPage';
import MonthlyClientReportsPage from './pages/MonthlyClientReportsPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
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
          <Route path='/clients' exact>
            <ClientsPage />
          </Route>
          <Route path='/reports' exact>
            <ReportsPage />
          </Route>
          <Route path='/monthly-client-reports' exact>
            <MonthlyClientReportsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
