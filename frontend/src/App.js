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
import DashboardPage from './pages/DashboardPage';
import MonthlyClientReportsPage from './pages/MonthlyClientReportsPage';
import MachineInventoryPage from './pages/MachineInventoryPage';
import TrainersPage from './pages/TrainersPage';
import TrainerDetailPage from './pages/TrainerDetailPage';
import MaintenanceLogPage from './pages/MaintenanceLogPage';
import EquipmentReports from './pages/EquipmentReports';

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
          <Route path='/dashboard' exact>
            <DashboardPage />
          </Route>
          <Route path='/monthly-client-reports' exact>
            <MonthlyClientReportsPage />
          </Route>
          <Route path='/machines' exact>
            <MachineInventoryPage />
          </Route>
          <Route path='/trainers' exact>
            <TrainersPage />
          </Route>
          <Route path='/trainers/:trainerId' exact>
            <TrainerDetailPage />
          </Route>
          <Route path='/maintenance' exact>
            <MaintenanceLogPage />
          </Route>
          <Route path='/equipment-reports' exact>
            <EquipmentReports />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
