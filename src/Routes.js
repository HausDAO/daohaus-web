import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/home/Home';
import FourOhFour from './views/fourOhFour/FourOhFour';


const Routes = () => (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" component={FourOhFour} />
    </Switch>
  );
  
  export default Routes;