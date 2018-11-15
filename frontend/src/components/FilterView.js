import React, { Component } from 'react';
import axios from 'axios';

import Searchbox from './Searchbox';
import CourseList from './CourseList';
import Course from './Course';

import url from '../url';
import smartSearch from '../helpers/smartSearch';

import '../styles/_filterview.scss';

class FilterView extends Component {

  state = {
    filteredCourses: [],
    searchString: '',
    activeCourse: null
  }

  onChange = value => {
    value = value.toLowerCase();
    if(value.length < 2) return;
    const { courses } = this.props;
    const filteredCourses = courses.filter(course => {
      return smartSearch(course, value);
    });
    this.setState({
      filteredCourses,
      searchString: value
    });
  }

  viewCourse = course => {
    const { activeCourse } = this.state;
    if(activeCourse) return;
    this.setState({ activeCourse: course }, this.fetchMore(course));
    this.scrollTop();
  }

  scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto"});
  }

  goBack = () => {
    this.setState({ activeCourse: null })
  }

  fetchMore = course => {
    axios.get(`${url}/courses/${course._id}?minify=true`).then(res => {

    this.setState(prev => ({ 
        activeCourse: {...prev.activeCourse, ...res.data} 
      }))
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { filteredCourses, activeCourse } = this.state;
    return (
      <div className='filter-view'>
        <Searchbox 
          course={activeCourse}
          onChange={this.onChange}
        />
        <CourseList 
          viewCourse={this.viewCourse}
          courses={filteredCourses}
          course={activeCourse}          
        />
        <Course 
          course={activeCourse}
          goBack={this.goBack}
        />
      </div>
    );
  }
}

export default FilterView;