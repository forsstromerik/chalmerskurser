import React, { Component } from 'react';

import '../styles/_searchbox.scss';

class Searchbox extends Component {

  state = {
    focused: false
  }

  onChange = () => {
    this.props.onChange(this.input.value);
  } 

  toggleFocus = b => {
    const { focused } = this.state;

    if(!focused && b) {
      this.setState({ focused: true });
    } else if (focused && !b && this.input.value === '' ) {
      this.setState({ focused: false });
    }
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.course && this.props.course) {
      this.input.value = `${this.props.course.code} - ${this.props.course.name}`;
    } else if (prevProps.course && !this.props.course) {
      this.input.value = '';
    }
  }

  render() {

    const { focused } = this.state;
    const { course } = this.props;

    if (course) this.toggleFocus(true);

    return [
      <label 
        key='0'
        ref={ref => this.label = ref}
        className={`input-label${focused ? ' focused' : ''}`}
        htmlFor='input'>
          Kursnamn/kurskod/examinator/hp/program/läsperiod/institution
      </label>,
      <input 
        key='1'
        disabled={course}
        ref={ref => this.input = ref} 
        onFocus={() => this.toggleFocus(true)}
        onBlur={() => this.toggleFocus(false)}
        onChange={this.onChange} 
        autoComplete='off'
        className='searchbox'
        id='input'
        >
      </input>
    ]
  }
}

export default Searchbox;