import React, { Component } from 'react';

import '../styles/_searchbox.scss';

class Searchbox extends Component {

  onChange = () => {
    this.props.onChange(this.input.value);
  } 

  render() {
    return (
      <input 
        className='searchbox'
        ref={ref => this.input = ref} 
        onChange={this.onChange} 
        placeholder={'Kursnamn/kurskod/examinator'}
      >
        
      </input>
    );
  }
}

export default Searchbox;