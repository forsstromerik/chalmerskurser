import React, { Component } from 'react';

import '../styles/_courseview.scss';

class CourseList extends Component {

  renderCourses = courseList => {
    return courseList.map((course, i) => {
      return <p key={i} className='course' onClick={() => this.props.viewCourse(course)}>
        <span>{course.code}</span>
        <span> - </span>
        <span>{course.name}</span>
        <span>{` [${course.credits} hp]`}</span>
      </p>
    })
  }

  render() {
    const { course, courses } = this.props;
    let courseList = this.renderCourses(courses);
    return (
      <div className={`courselist${course ? '' : ' active'}`}>
        {courseList}
      </div>
    );
  }
}

export default CourseList;