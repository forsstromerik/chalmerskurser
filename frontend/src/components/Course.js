import React, { Component } from 'react';

import getInstitution from '../helpers/parseInstitution';

import '../styles/_course.scss';

class Course extends Component {
  render() {
    const { course } = this.props;

    return (
      <div className={`course-info${course ? ' active' : ''}`}>
        <button onClick={this.props.goBack} className='back-button'>{`⬅ Tillbaka`}</button>
        {course && course.institution && <div className='institution'>{getInstitution(course.institution)}</div>}
        {course && course.examinator &&
          <div className='examinator-and-credits'>
            <div className='examinator'>{`Examinator: ${course.examinator}`}</div>
            <div className='credits'>{`${course.credits} hp`}</div>
          </div>
        }
        {course && 
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
        </div>
        }
        {course && 
        <div className='more-buttons'> 
          {course.homepage && 
          <a href={course.homepage} target='_blank'>
            <button className='button'>
              🖥 Kurshemsida
            </button>
          </a>
          } 
          {course.examinatorURL && 
          <a href={course.examinatorURL} target='_blank'>
            <button className='button'>
              💼 Examinatorns sida
            </button>
          </a>
          }
        </div>
        }
        {course && <h2>Kursplan</h2>}
        {course && <div className='set-inner' dangerouslySetInnerHTML={{__html: course.syllabus}} />}
        {course && course.url &&
        <div className='bottom-button-holder'>
          <a href={course.url} target='_blank'>
            <button className='bottom-button'>
              🖥 Gå till orginalsidan
            </button>
          </a>
        </div>
        }
        <div className='footer'></div>
      </div>
    );
  }
}

export default Course;