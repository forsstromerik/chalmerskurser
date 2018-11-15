import React, { Component } from 'react';

import { getInstitution, getProgramme } from '../helpers/parser';

import '../styles/_courselistview.scss';

class CourseList extends Component {

  renderSecondRow = course => [
      <span>{course.sp ? ('Läsperiod: ' + course.sp) : ''}</span>,
      <span>{course.examinator ? ('Examinator: ' + course.examinator) : ''}</span>,
      <span>{course.ownerProgram ? ('Tillhör: ' + course.ownerProgram + ' - ' + getProgramme(course.ownerProgram)) : ''}</span>,
      <span>{course.institution ? ('Institution: ' + getInstitution(course.institution)) : ''}</span>
  ]

  renderCourses = courseList => {
    return courseList.map((course, i) => {
      return <p key={i} className='course' onClick={() => this.props.viewCourse(course)}>
        <div className='first-row'>
          <span>{course.code}</span>
          <span> - </span>
          <span>{course.name}</span>
          <span>{course.credits ? ` [${course.credits} hp]` : null}</span>
        </div>
        <div className='second-row'>
          {this.renderSecondRow(course)}
        </div>
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