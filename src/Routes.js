import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/home/Home";
import Dao from "./views/dao/Dao";
import Summon from "./views/summon/Summon";
import FourOhFour from "./views/fourOhFour/FourOhFour";
import Profile from "./views/profile/Profile";

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/dao/:contractAddress" exact component={Dao} />
    <Route path="/summon" exact component={Summon} />
    <Route path="/profile" exact component={Profile} />
    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
