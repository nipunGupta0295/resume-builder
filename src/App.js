import React from 'react';

import './static/scss/app.scss';
import 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Header from './components/presentation/header';
import Footer from './components/presentation/footer';
import LandingPage from './components/presentation/landingPage';
import GettingStarted from './components/presentation/gettingStarted';
import Login from './components/presentation/login';
import Register from './components/presentation/register';
import Contacts from './components/presentation/contact';
import Education from './components/presentation/education';
import Finalize from './components/presentation/finalizePage';
import AddResume from './components/presentation/addResume';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <div className="outer-container">
      <Header></Header>

      <Switch>
        <PrivateRoute path="/education" component={Education}></PrivateRoute>
        <PrivateRoute path="/contact" component={Contacts}></PrivateRoute>
        <PrivateRoute path="/getting-started" component={GettingStarted}></PrivateRoute>
        <PrivateRoute path="/resume-templates" component={GettingStarted}></PrivateRoute>
        <PrivateRoute path="/finalize" component={Finalize}></PrivateRoute>
        <PrivateRoute path="/add-resume" component={AddResume}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/" component={LandingPage}></Route>
      </Switch>
      {/* <Footer></Footer> */}
    </div>

  );
}

export default App;
