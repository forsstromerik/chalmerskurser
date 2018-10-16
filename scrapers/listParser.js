module.exports = listParser = arr => {
  
  let counter = 0;
  let changedNum = false;
  let parsedList = [];
  let course = {
    //id: '',
    code: '',
    name: '',
    credits: '',
    institution: '',
    url: '',
    homepage: '',
    sp: '',
    examinator: '',
    examinatorURL: '',
    syllabus: []
  }

  /* Find the line in the file to start from */
  let startIndex = 0;
  let found = false;
  while(!found && startIndex < arr.length) {
    if(arr[startIndex].match(/\s*?<!--\s*?Result Navigation Pane END\s*?-->/i)){
      /* Regex is a good identifier, now jump ~10 lines */
      found = true;
      startIndex += 10;
    } else {
      startIndex++;
    }
  }

  for (let i = startIndex; i < arr.length; i++) {
    if(counter === 0 && changedNum || i === arr.length -1) {
      if(course.code && course.name) {
        parsedList.push(course);
      } 
      course = {
        //id: '',
        code: '',
        name: '',
        credits: '',
        institution: '',
        url: '',
        homepage: '',
        sp: '',
        examinator: '',
        examinatorURL: '',
        syllabus: []
      }
    }
    if(arr[i].match(/\s+<tr/)) {
      if (counter > 0) {
        counter = 0;
        changedNum = true;
      }
    } else if (arr[i].match(/\s+?<td/)) {
      counter++;
      changedNum = true;
    } else {
      changedNum = false;
    }
    if(counter === 1 && changedNum) {
      let ans = RegExp(/<a.+>(.+)<\/a>/).exec(arr[i]);
      if(ans !== null) {
        course.code = ans[1];
        //course.id = ans[1];
      }
    }
    else if(counter === 2 && changedNum) {
      let ans = RegExp(/<a.+>(.+)<\/a>/).exec(arr[i]);
      if(ans !== null) {
        course.name = ans[1];
      }
    }
    else if(counter === 3 && changedNum) {
      let ans = RegExp(/<td>(\d+,?\d+).+</).exec(arr[i]);
      if(ans !== null) {
        course.credits = ans[1];
      }
    }
    else if(counter === 4 && changedNum) {
      let ans = RegExp(/<td>\s?(.+)\s?<\/td>/).exec(arr[i]);
      if(ans !== null) {
        course.institution = ans[1];
      }
    }
    else if(counter === 5 && changedNum) {
      let ans = RegExp(/<a href="(.+)">.+<\/a>/).exec(arr[i]);
      if(ans !== null) {
        course.url = `${process.env.BASE_URL}${ans[1]}`;
      }
    }
    else if(counter === 6) {
      let ans = RegExp(/.+href="(\S+)"/).exec(arr[i]);
      if(ans === null) {
        ans = RegExp(/.+href="(\S+)/).exec(arr[i]);
      }
      if(ans !== null) {
        course.homepage = ans[1];
      }
    }
  }
  return parsedList;
}