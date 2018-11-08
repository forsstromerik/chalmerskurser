const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Course = require('./course');

/* Post new course to db */
router.post('/course', (req, res) => {

  if(!(req && req.body && req.body.course && req.body.course.code && req.body.course.name)) {
    res.status(400).json({
      error: 'Error: not valid parameters'
    });
    return;
  }

  /* Check for dup */
  Course.findOne({ code: req.body.course.code }, (err, c) => {

    /* Don't store dup */
    if (c) { 
      console.log(`Error. Course already exists: ${c}`);
      res.status(403).json({
        error: 'Error: course already exists'
      })
      return;
    }; 

    const course = new Course({
      _id: new mongoose.Types.ObjectId(),
      code: req.body.course.code,
      name: req.body.course.name,
      url: req.body.course.url,
      credits: req.body.course.credits,
      institution: req.body.course.institution,
      homepage: req.body.course.homepage,
      sp: req.body.course.sp,
      examinator: req.body.course.examinator,
      examinatorURL: req.body.course.examinatorURL,
      syllabus: req.body.course.syllabus
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
})

/* Post array of courses to db */
router.post('/', (req, res) => {
  Promise.all(req.body.res.map(obj => {
    Course.findOne({ code: obj.code }, (err, c) => {
      /* Don't store duplicates */
      if (c) { 
        console.log(`Error. Course already exists: ${c.code} - ${c.name}`);
        return;
      }; 

      const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        code: obj.code,
        name: obj.name,
        url: obj.url,
        credits: obj.credits,
        institution: obj.institution,
        homepage: obj.homepage,
        sp: obj.sp,
        examinator: obj.examinator,
        examinatorURL: obj.examinatorURL,
        syllabus: obj.syllabus
      });
      course.save()
      .then(_res => {
        console.log("Saved");
      })
      .catch(err => {
        console.log(err);
      })
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
      examinator: true
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
  if (req.query.minify === 'true') {
    Course.findById(id, {
      _id: false,
      code: false, 
      name: false, 
      credits: false, 
      examinator: false
    })
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
    Course.findById(id)
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
  }
})

/* Make changes to specific course */
router.patch('/:courseID', (req, res) => {
  const id = req.params.courseID;
  let updateOps = {};
  for(const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Course.update({ _id: id }, { $set: updateOps })
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

module.exports = router;