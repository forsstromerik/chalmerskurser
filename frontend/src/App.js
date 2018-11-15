import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import FilterView from './components/FilterView';

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' component={FilterView} />
        </Switch>
    );
  }
}

export default App;
