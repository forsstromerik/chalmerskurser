import React, { Component } from 'react';

import Searchbox from './Searchbox';
import CourseList from './CourseList';

import '../styles/_filterview.scss';

class FilterView extends Component {

  state = {
    filteredCourses: [],
    searchString: ''
  }

  onChange = value => {
    //if(value.length < 2) return;
    const { courses } = this.props;
    const filteredCourses = courses.filter(course => {
      let regexp = RegExp(value);
      return  course.name.match(regexp) ||
              course.code.match(regexp) ||
              course.examinator.match(regexp);
    });
    this.setState({
      filteredCourses,
      searchString: value
    });

  }

  render() {
    const { filteredCourses } = this.state;
    return (
      <div className='filter-view'>
        <Searchbox 
          onChange={this.onChange}
        />
        <CourseList 
          courses={filteredCourses}
        />
      </div>
    );
  }
}

export default FilterView;