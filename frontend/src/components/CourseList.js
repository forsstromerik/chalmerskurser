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
    const { course, courses, showAll, searchTip, limit } = this.props;
    let courseList = this.renderCourses(courses);
    return (
      <div className={`courselist${course ? '' : ' active'}`}>
      <div className={(searchTip && courseList.length > limit) ? 'search-tip active' : 'search-tip'}>
        {(searchTip && courseList.length > limit) ? 
          `Visar ${limit} av ${courses.length} resultat. Tryck [Enter] för att visa alla resultat` : ''}
      </div>
        {showAll ? courseList : courseList.slice(0, limit)}
      </div>
    )
  }
}

export default CourseList;
