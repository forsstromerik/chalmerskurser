const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Course = require('./course');

/* TODO: As of now, there is no check for already existing courses,
** which means that we are storing duplicates */

/* Post new course to db */
router.post('/course', (req, res) => {
  Course.findOne({ code: req.body.code }, (err, c) => {

    /* Don't store duplicates */
    if (c) { 
      console.log(`Error. Course already exists: ${c}`);
      return;
    }; 

    const course = new Course({
      _id: new mongoose.Types.ObjectId(),
      code: req.body.code,
      name: req.body.name,
      url: req.body.url,
      credits: req.body.credits,
      institution: req.body.institution,
      homepage: req.body.homepage,
      sp: req.body.sp,
      examinator: req.body.examinator,
      examinatorURL: req.body.examinatorURL,
      syllabus: req.body.syllabus
    });

    course
      .save()
      .then(_res => {
        console.log(_res);
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
      console.log(obj.code);
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
  Course.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
})

/* Get specific course */
router.get('/:courseID', (req, res) => {
  const id = req.params.courseID;
  Course.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
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
})

/* Make changes to specific course */
router.patch('/:courseID', (req, res) => {
  const id = req.params.courseID;
  let updateOps = {};
  for(const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);

  Course.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(_res => {
      console.log(_res);
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