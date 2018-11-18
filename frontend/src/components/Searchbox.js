import React, { Component } from 'react';

import '../styles/_searchbox.scss';

class Searchbox extends Component {

  state = {
    focused: false,
    timer: 0,
    value: '',
    pressedEnter: false
  }

  onChange = () => {
    this.props.onChange(this.input.value);
    this.setState({ value: this.input.value });
  } 

  toggleFocus = b => {
    const { focused } = this.state;

    if(!focused && b) {
      this.setState({ focused: true });
    } else if (focused && !b && this.input.value === '' ) {
      this.setState({ focused: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.course && this.props.course) {
      this.input.value = `${this.props.course.code} - ${this.props.course.name}`;
    } else if (prevProps.course && !this.props.course) {
      this.input.value = this.props.searchString;
    }
    if(!prevProps.course && this.props.course) {
      this.toggleFocus(true)
    }
    if((prevState.value.replace(/ g/, '').length === 0 && this.state.value.replace(/ g/, '').length > 0)
      || (this.state.pressedEnter && this.state.value.replace(/ g/, '').length > prevState.value.replace(/ g/, '').length)) {
      this.startTimer();
    }
    if(prevState.timer === 0 && this.state.timer === 1) {
      this.props.toggleSearchTip(true);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timer);
  }

  startTimer = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState(prev => ({ timer: prev.timer + 1 }));
    }, 1000);
  }

  pressedKey = e => {
    if (e.charCode !== 13) {
      this.props.showAll(false);
    } else {
      this.props.showAll(true);
      this.props.toggleSearchTip(false);
      this.setState({ pressedEnter: true });
      clearInterval(this.timer);
      
    }
    this.setState({ timer: 0 });
  }

  render() {
    const { focused } = this.state;
    const { course } = this.props;
    return [
      <label 
        key='0'
        ref={ref => this.label = ref}
        className={`input-label${focused ? ' focused' : ''}`}
        htmlFor='input'>
          Namn, Kod, Examinator, HP, Program, Läsperiod, Institution
      </label>,
      <input 
        key='1'
        disabled={course}
        ref={ref => this.input = ref} 
        onFocus={() => this.toggleFocus(true)}
        onBlur={() => this.toggleFocus(false)}
        onChange={this.onChange} 
        onKeyPress={e => this.pressedKey(e)}
        autoComplete='off'
        className='searchbox'
        id='input'
        >
      </input>
    ]
  }
}

export default Searchbox;
