import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/auth/Login';
import React from 'react';
import Signup from './components/auth/Signup';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/auth/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home/Home';

function App() {
  return (
    <Router>

    <ToastContainer />
      <Switch>
      <Route path="/" exact component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      
      </Switch>
      <Footer/>
    
    </Router>
  );
}

export default App;
