import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './views/Home/Home';
import Dao from './views/Dao/Dao';
import DaoV2 from './views/Dao/DaoV2';
import Apply from './views/Apply/Apply';
import Profile from './views/Profile/Profile';
import Stats from './views/Stats/Stats';
import Building from './views/Building/Building';
import FourOhFour from './views/FourOhFour/FourOhFour';
import About from './views/About/About';
import Help from './views/Help/Help';
import Gas from './views/Stats/Gas';
import Explore from './views/Explore/Explore';

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
      component={DaoV2}
    />
    <Route
      path="/apply/:contractAddress(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Apply}
    />
    <Route
      path="/profile/:account(\b0x[0-9a-f]{10,40}\b)"
      exact
      component={Profile}
    />
    <Route path="/explore" exact component={Explore} />
    <Route path="/help" exact component={Help} />
    <Route path="/about" exact component={About} />
    <Route path="/stats" exact component={Stats} />
    <Route path="/carbon-footprint" exact component={Gas} />
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
