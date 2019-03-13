const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Course = require('./course');
const CourseStat = require('./courseStat');

/* Post new course to db */
router.post('/course', (req, res) => {
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    code: req.body.course.code,
    credits: req.body.course.credits,
    examinator: req.body.course.examinator,
    examinatorURL: req.body.course.examinatorURL,
    gradeType: req.body.course.gradeType,
    homepage: req.body.course.homepage,
    institution: req.body.course.institution,
    name: req.body.course.name,
    ownerProgram: req.body.course.ownerProgram,
    ownerProgramURL: req.body.course.ownerProgramURL,
    sp: req.body.course.sp,
    syllabus: req.body.course.syllabus,
    url: req.body.course.url
  });

  course
    .save()
    .then(_res => {
      res.status(201).json({
        message: 'Handling POST request to /courses/course',
        createdCourse: course
      });
    })
    .catch(err => {
      console.error(err); 
      res.status(500).json({ error: err });
    })
})

/* Post array of courses to db */
router.post('/', (req, res) => {
  Promise.all(req.body.res.map(obj => { 
    const course = new Course({
      _id: new mongoose.Types.ObjectId(),
      code: obj.code,
      credits: obj.credits,
      examinator: obj.examinator,
      examinatorURL: obj.examinatorURL,
      gradeType: obj.gradeType,
      homepage: obj.homepage,
      institution: obj.institution,
      name: obj.name,
      ownerProgram: obj.ownerProgram,
      ownerProgramURL: obj.ownerProgramURL,
      sp: obj.sp,
      syllabus: obj.syllabus,
      url: obj.url
    });
    course.save()
    .then(_res => {
      console.log("Saved");
    })
    .catch(err => {
      console.log(err);
    })
  })).then(() => {
    res.status(201).json({ message: 'Courses created' });
  }).catch(_err => { 
    res.status(500).json({ error: _err });
  })
})

/* Get all courses */
router.get('/', (req, res) => {
  if (req.query.minify === 'true') {
    Course.find({}, { 
      code: true, 
      name: true, 
      credits: true, 
      examinator: true,
      ownerProgram: true,
      sp: true,
      institution: true
    }).exec().then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      })
  } else {
    Course.find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      })
  }
})

/* Get specific course */
router.get('/:courseID', (req, res) => {
  const id = req.params.courseID;
  if(!id) return;

  /* Query parameter could be _id or course code */
  if(id.length > 8) {
    Course.findById(id, req.query.minify === 'true' ? 
    {
      _id: false,
      code: false, 
      name: false, 
      credits: false, 
      examinator: false,
      ownerProgram: false,
      sp: false,
      institution: false
    } : {})
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No course found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  } else {
    Course.findOne({ code: id }).exec()
    .then(doc => {
      if(doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: 'No course found' });
      }
    })
  }
})

/* Make changes to specific course */
router.patch('/:courseID', (req, res) => {
  const id = req.params.courseID;
  let updateOps = {};
  for(const ops of Object.keys(req.body.course)) {
    updateOps[ops] = req.body.course[ops]
  }

  Course.findOneAndUpdate(id.length > 8 ? { _id: id } : { code: id }, { $set: updateOps })
  .exec()
  .then(_res => {
    res.status(200).json(_res)
    })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error: err });
  });  
})

/* Remove a course from db */
router.delete('/:courseID', (req, res) => {
  const id = req.params.courseID;
  Course.remove({ _id: id })
    .exec()
    .then(_res => {
      res.status(200).json(_res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
})

/* ---------------------------------------------------------------- */

router.post('/courseStat', (req, res) => {
  let stat = req.body.courseStat;
  const courseStat = new CourseStat({
    _id: new mongoose.Types.ObjectId(),
    code: stat.code,
    name: stat.name,
    popularity: 1,
    queries: [stat.query]
  })
  courseStat
    .save()
    .then(_res => {
      res.status(201).json({
        message: 'Handling POST request to /courses/courseStat',
        createdCourseStat: courseStat
      });
    })
    .catch(e => {
      CourseStat.findOneAndUpdate({ code: courseStat.code }, { $inc: { popularity: 1 } }).then(r => {
        if(stat.query) {
          CourseStat.findOneAndUpdate({ code: courseStat.code }, { $push: { queries: stat.query } }).then(re => {
            res.status(200).json(re)
          }).catch(_ => res.status(500).json({ error: _ }))
        } else {
          res.status(200).json(r)
        }
      }).catch(err => {
        res.status(500).json({ error: err });
      })
    })
})

module.exports = router;
