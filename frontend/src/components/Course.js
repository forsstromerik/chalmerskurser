import React, { Component } from 'react';

import '../styles/_course.scss';

class Course extends Component {
  render() {

    const { course } = this.props;

    if(!course) return null;
    /*  TODO: Complete this course info page.
              Modify scraping of syllabus in order to
              render syllabus via dangerouslySetInnerHTML.
    */
    return (
      <div className={`course-info${course ? ' active' : ''}`}>
        <div dangerouslySetInnerHTML={{__html: course.syllabus}} />
      </div>
    );
  }
}

export default Course;