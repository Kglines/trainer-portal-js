// frontend/src/App.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './pages/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path='/'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
