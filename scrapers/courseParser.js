const axios = require('axios');
const fs = require('fs');

/* Fetch course pages for courses */
module.exports = courseParser = arr => {
  return new Promise((resolve, reject) => {
    let index = 0;
    let list = [];
    let timer = setInterval(() => {
      if (index < arr.length) {
        console.log(`Querying item ${index + 1} of ${arr.length}: ${arr[index].code} - ${arr[index].name}`);
        axios.get(arr[index++].url)
        .then(async res => {
          let parsed = await parseHTML(res.data, arr[index - 1]);
          console.log(parsed);
          /* TODO: More failsafe: Save post immediately instead */
          list.push(parsed);
        })
        .catch(() => {
          clearInterval(timer);
          reject(list);                        
        });
      } else {
        clearInterval(timer);
        resolve(list);
      }
    }, (Math.random()*7000 + 1000));
  })
}

/* Given some scraped HTML, return new course data */
parseHTML = (data, course) => {
  return new Promise((res => {
    let buffer = Buffer.from(data);
    fs.writeFile(`${process.env.UNPARSED_COURSE_PATH}${course.code}.data`, buffer, 'utf8', err => {
      if (err) throw err;
      fs.readFile(`${process.env.UNPARSED_COURSE_PATH}${course.code}.data`, 'utf8', (err, data) => {
        if (err) throw err;
        let arr = data.split(/[\r\n]+/g);
        let updatedCourse = parseWithRegex(arr, course);
        res(updatedCourse);
      });
    })
  }))
}

/* Extract data with regex */
parseWithRegex = (arr, course) => {
  let startCount = false;
  let stopCount = false;
  let counter = 0;
  let checkNextRow = false;
  let updatedCourse = { ...course };
  let addToSyllabus = false;
  let HTMLstring = '';
  for (let i = 0; i < arr.length; i++) {
    let ans = RegExp(/\s+?<td style="border-style: none solid none none; border-width: 1px; border-color: #cccccc">&nbsp;<\/td>/).exec(arr[i]);
    if(ans !== null && !stopCount) {
      startCount = true;
      stopCount = true;
    }
    if(startCount) {
      let ans = RegExp(/\s+?<td>/).exec(arr[i]);
      let sp = RegExp(/\s+\d+,?\d+?hp/).exec(arr[i]);
      if(ans) {
        counter++;
      } else if (sp) {
        startCount = false;
        if(counter < 5) {
          updatedCourse.sp = `LP${counter}`;
        } else if ( counter === 5) {
          updatedCourse.sp = 'Sommarkurs';
        } else {
          updatedCourse.sp = 'Ej LP';
        }
      }
    }
    let foundExaminator = RegExp(/\s+?<h4>Examinator:/).exec(arr[i]);
    if(foundExaminator) {
      checkNextRow = true;
    }
    if(checkNextRow){
      let examinator = RegExp(/\s+?<a href="(\S+)".+>(.+)<\/a>/).exec(arr[i]);
      if(examinator){
        checkNextRow = false;
        updatedCourse.examinatorURL = examinator[1];
        updatedCourse.examinator = examinator[2];
      }
    }
    let start = RegExp(/\s+?<i>\S+Behörighet:/).exec(arr[i]);
    if(start) {
      addToSyllabus = true;
    }
    if(addToSyllabus){
      let stop = RegExp(/\W*<\/div>/).exec(arr[i]);
      if(stop) {
        addToSyllabus = false;
        updatedCourse.syllabus = HTMLstring;
      } else {
        HTMLstring += arr[i];
      }
    }
  }
  return updatedCourse;
}