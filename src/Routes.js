import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './views/home/Home';
import Dao from './views/dao/Dao';
import Summon from './views/summon/Summon';
import Apply from './views/apply/Apply';
import Profile from './views/profile/Profile';
import Stats from './views/stats/Stats';
import Building from './views/building/Building';
import FourOhFour from './views/fourOhFour/FourOhFour';
import About from './views/about/About';
import Help from './views/help/Help';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route
      path="/dao/v1/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Dao}
    />
    <Route
      path="/dao/v2/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Dao}
    />
    <Route
      path="/apply/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Apply}
    />
    <Route path="/summon" exact component={Summon} />
    <Route
      path="/profile/:account(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Profile}
    />
    <Route path="/help" exact component={Help} />
    <Route path="/about" exact component={About} />
    <Route path="/stats" exact component={Stats} />
    <Route
      path="/building-dao/:version/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Building}
    />
    <Redirect
      from="/dao/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      to="/dao/v1/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
    />
    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
