const axios = require('axios');
const fs = require('fs');

/* Fetch course pages for courses */
module.exports = courseParser = arr => {
  return new Promise((resolve, reject) => {
    let index = 0;
    let list = [];
    console.log('');
    console.log('-----------------------------------------------------------');
    console.log('');
    let timer = setInterval(() => {
      if (index < arr.length) {
        console.log(`Querying item ${index + 1} of ${arr.length}: ${arr[index].code} - ${arr[index].name}`);
        axios.get(arr[index++].url)
        .then(async res => {
          let parsed = await parseHTML(res.data, arr[index - 1]);
          list.push(parsed);
          save(parsed, index === arr.length);
        })
        .catch(() => {
          console.log(`Failed fetching any new data for ${arr[index - 1].code} - ${arr[index - 1].name}`);
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
      let stop = RegExp(/\s*<\/table/).exec(arr[i + 10]);
      if(stop) {
        let j = i + 10;
        let k = j
        for (k; k >= i; k--) {
          let match = (
            arr[k].match(/\s*<\/table/) ||
            arr[k].match(/\s*<\/tr/)    ||
            arr[k].match(/\s*<\/td/)    ||
            arr[k].match(/\s*<\/div/)   ||
            arr[k].match(/\s*<\/tbody/) 
            );
          if (!match) {
            j = k;
            break;
          }
        }
        j = Math.min(j, k);
        for (let n = i; n <= j; n++) {
          HTMLstring += arr[n].toString();
        }
        addToSyllabus = false;
        updatedCourse.syllabus = HTMLstring;
      } else {
        HTMLstring += arr[i].toString();
      }
    }
    let ownerProgram = RegExp(/\s*<td.*Ägare:.*href="(.*)">(.*)<\/a><\/td>/).exec(arr[i]);
    if (ownerProgram) {
      updatedCourse.ownerProgram = ownerProgram[2];
      updatedCourse.ownerProgramURL = `${process.env.BASE_URL}${ownerProgram[1]}`;
    }
    const gradeType = RegExp(/\W*<td.*<b>\W*(Betygskala:)\W*<\/b>\W*(.*)\W*<\/td>/).exec(arr[i]);
    if(gradeType) {
      updatedCourse.gradeType = gradeType[2];
    }
  }
  return updatedCourse;
}

save = (course, last) => {
  axios.post(`${process.env.API_BASE_URL}course`, { ...course }).then(res => {
    console.log(`Saved ${course.code} - ${course.name} to database successfully!`);
  }).catch(async err => {
    console.log(`Error: could not save ${course.code} - ${course.name} to database`);
    console.log(err);
    
    console.log(`Will try to update existing course ${course.code} - ${course.name}`);
    console.log(`Checking all object values for ${course.code} - ${course.name} before patching`);

    if(validate(course)) {
      console.log(`Values seem to be ok, patching course`);
      try {
        await patchCourse(course);
        console.log('Successfully patched course');
      } catch(err) {
        console.log('Error, could not patch course');
        console.log(err);
      }
    } else {
      console.log(`Error: Something is wrong with the course object:`);
      console.log(course);
      // TODO: Send myself an email about this
    }
  }).then(() => {
    console.log('');
    console.log('-----------------------------------------------------------');
    console.log('');
    if(last) {
      console.log('Saved all courses - finished!');
      console.log('');
      console.log('############################################################');
      console.log('');
    }
  })
} 

validate = course => {
  return (
    course.code &&
    course.name &&
    course.credits &&
    course.institution &&
    course.url &&
    course.sp &&
    course.examinator &&
    course.syllabus
  );
}

patchCourse = async course => {
  return new Promise((resolve, reject) => {
    axios.patch(`${process.env.API_BASE_URL}${course.code}`, { ...course })
    .then(res => {
      resolve(res);
    })
    .catch(err => {
      reject(err);
    })
  })
}