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
    return: false,
    showAll: false,
    searchTip: false,
    limit: 30
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
    if(value.length < 2) {
      this.setState({ filteredCourses: [] })
      return;
    };
    const { courses } = this.state;
    const filteredCourses = courses.filter(course => {
      return smartSearch(course, value);
    });
    this.setState({
      filteredCourses,
      searchString: value,
      searchTip: this.state.searchTip && filteredCourses.length > this.state.limit
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
    const { code, name } = course;
    axios.get(`${url}/courses/${course._id}?minify=true`).then(res => {

    this.setState(prev => ({ 
        activeCourse: {...prev.activeCourse, ...res.data} 
      }), this.log(code, name))
    })
    .catch(err => {
      console.log(err);
    })
  }

  log = (code, name) => {
    const { searchString } = this.state;
    let courseStat = {
      code,
      name,
      query: searchString
    }
    axios.post(`${url}/courses/coursestat`, { courseStat });
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

  showAll = show => {
    this.setState({ showAll: show });
  }

  toggleSearchTip = toggle => {
    const { filteredCourses } = this.state;
    this.setState({ searchTip: (toggle && filteredCourses.length > this.state.limit) });
  }

  render() {
    const { 
      filteredCourses, 
      activeCourse, 
      searchString, 
      showAll, 
      searchTip, 
      limit 
    } = this.state;
    let redirect = this.redirect();
    return (
      <div className='main'>
        <span className='tip'>
          <p>Kombinera sökord med ett # (Ex: LP3 # 7,5 # Data)</p>
        </span>
        <div className='filter-view'>
          <Searchbox 
            course={activeCourse}
            onChange={this.onChange}
            searchString={searchString}
            showAll={this.showAll}
            toggleSearchTip={this.toggleSearchTip}
          />
          <CourseList
            viewCourse={this.viewCourse}
            courses={filteredCourses}
            course={activeCourse}    
            showAll={showAll}
            searchTip={searchTip}
            limit={limit}
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
