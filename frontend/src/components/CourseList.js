import React, { Component } from 'react';

import '../styles/_courseview.scss';

class CourseList extends Component {

  renderCourses = courseList => {
    return courseList.map((course, i) => {
      return <p key={i} className='course'>{`${course.code} - ${course.name} [${course.credits} hp]`}</p>
    })
  }

  render() {
    const { courses } = this.props;
    let courseList = this.renderCourses(courses);
    return (
      <div className='courselist'>
      {courseList}
      </div>
    );
  }
}

export default CourseList;