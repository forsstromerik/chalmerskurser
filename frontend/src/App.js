import React, { Component } from 'react';
import axios from 'axios';

import FilterView from './components/FilterView';

import './styles/_mainview.scss';

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    axios.get('http://0.0.0.0:3001/courses?minify=true').then(res => {
      this.setState({ data: res.data })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { data } = this.state;

    return (
      <div className='main'>
        <FilterView 
          courses={data}
        />
      </div>
    );
  }
}

export default App;
