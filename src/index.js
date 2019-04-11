import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './views/home';
import Manager from './views/manager';
import Employee from './views/employee';
import Task from './views/task';
import Profile from './views/profile';
import Daily from './views/daily';
import Total from './views/total';
import RegisterEmp from './views/registerEmp';
import RegisterMgr from './views/registerMgr';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
		  <Route exact path='/' component={Home}/>
          <Route exact path='/employee' component={Employee}/>
          <Route exact path='/task' component={Task}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/manager' component={Manager}/>
          <Route exact path='/daily' component={Daily}/>
          <Route exact path='/total' component={Total}/>
          <Route exact path='/register/employee' component={RegisterEmp}/>
          <Route exact path='/register/manager' component={RegisterMgr}/>
	</Router>
    , 
    document.getElementById('root'));

serviceWorker.unregister();
