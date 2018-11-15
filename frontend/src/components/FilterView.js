import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Searchbox from './Searchbox';
import CourseList from './CourseList';
import Course from './Course';

import url from '../url';
import smartSearch from '../helpers/smartSearch';

import '../styles/_mainview.scss';
import '../styles/_filterview.scss';

class FilterView extends Component {

  state = {
    courses: [],
    filteredCourses: [],
    searchString: '',
    activeCourse: null,
    return: false
  }

  componentDidMount() {
    axios.get(`${url}/courses?minify=true`).then(res => {
      this.setState({ courses: res.data })
    })
    .catch(err => {
      console.log(err);
    }).then(() => {
      this.checkURL();
    })
  }

  checkURL = () => {
    let query = this.props.history.location.search;
    if (this.props.history.location.search) {
      query = query.split('=');
      query = query[query.length - 1];
      const { courses } = this.state;
      this.viewCourse(courses.filter(c => c.code === query)[0]);
    }
  }

  onChange = value => {
    value = value.toLowerCase();
    if(value.length < 2) return;
    const { courses } = this.state;
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
    if(activeCourse || !course) return;
    this.setState({ activeCourse: course, return: false }, this.fetchMore(course));
    this.scrollTop();
    this.props.history.push(`?course=${course.code}`);
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

  componentDidUpdate (prevProps, prevState) {
    if (prevState.activeCourse && !this.state.activeCourse) {
      this.setState({ return: true })
    }
  }

  redirect = () => {
    if (!this.state.return) return null;
    if (window.location.href[window.location.href.length - 1] !== '/'){
      return <Redirect to='/' />
    } else {
      return null;
    }
  }

  render() {
    const { filteredCourses, activeCourse, searchString } = this.state;
    let redirect = this.redirect();
    return (
      <div className='main'>
        <div className='filter-view'>
          <Searchbox 
            course={activeCourse}
            onChange={this.onChange}
            searchString={searchString}
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
          {redirect}
        </div>
      </div>
    );
  }
}

export default FilterView;