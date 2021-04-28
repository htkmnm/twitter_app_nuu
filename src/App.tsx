import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import SimpleModal from './components/SimpleModal';
import Create from './components/Create';
import ResetPassword from './components/ResetPassword';

function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Main" component={Main} />
          <Route exact path="/SimpleModal" component={SimpleModal} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
        </Switch>
      </Router>
    </div>
  );

};

export default App;
