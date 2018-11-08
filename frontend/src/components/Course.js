import React, { Component } from 'react';

import getInstitution from '../helpers/parseInstitution';

import '../styles/_course.scss';

class Course extends Component {

  renderCourseInfo = () => {
    const { course } = this.props;
    if(course && Object.keys(course).length > 6) {
      return [
        <div className='institution'>{getInstitution(course.institution)}</div>,
        <div className='examinator-and-credits'>
          <div className='examinator'>{`Examinator: ${course.examinator}`}</div>
          <div className='credits'>{`${course.credits} hp`}</div>
        </div>,
        <div className='study-periods'>
          <div className='row'>
            <div className='first-four'>
              <span className='lp1'>Läsperiod 1</span>
              <span className='lp2'>Läsperiod 2</span>
              <span className='lp3'>Läsperiod 3</span>
              <span className='lp4'>Läsperiod 4</span>
            </div>
            <div className='last-two'>
              <span className='lp5'>Sommarkurs</span>
              <span className='lp6'>Ej läsperiod</span>
            </div>
          </div>
          <div className='row block'>
            <div className='first-four block'>
              <div className={`lp1 block${course.sp === 'LP1' ? ' active' : ''}`}>Läsperiod 1</div>
              <div className={`lp2 block${course.sp === 'LP2' ? ' active' : ''}`}>Läsperiod 2</div>
              <div className={`lp3 block${course.sp === 'LP3' ? ' active' : ''}`}>Läsperiod 3</div>
              <div className={`lp4 block${course.sp === 'LP4' ? ' active' : ''}`}>Läsperiod 4</div>
            </div>
            <div className='last-two'>
              <div className={`lp5 block${course.sp === 'Sommarkurs' ? ' active' : ''}`}>Sommarkurs</div>
              <div className={`lp6 block${course.sp === 'Ej LP' ? ' active' : ''}`}>Ej läsperiod</div>
            </div>
          </div>
        </div>,
        <div className='more-buttons'> 
          <a href={course.homepage} target='_blank'>
            <button className='button'>
              🖥 Kurshemsida
            </button>
          </a>
          <a href={course.examinatorURL} target='_blank'>
            <button className='button'>
              💼 Examinatorns sida
            </button>
          </a>
        </div>,
        <h2>Kursplan</h2>,
        <div className='set-inner' dangerouslySetInnerHTML={{__html: course.syllabus}} />,
        <div className='bottom-button-holder'>
          <a href={course.url} target='_blank'>
            <button className='bottom-button'>
              🖥 Gå till orginalsidan
            </button>
          </a>
        </div>
      ];
    } else {
      return null;
    }
  }

  render() {
    const { course } = this.props;
    let courseInfo = this.renderCourseInfo();
    return (
      <div className={`course-info${course ? ' active' : ''}`}>
        <button onClick={this.props.goBack} className='back-button'>{`⬅ Tillbaka`}</button>
        {courseInfo}
        <div className='footer' />
      </div>
    );
  }
}

export default Course;