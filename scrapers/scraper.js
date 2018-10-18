require('dotenv').load();
const axios = require('axios');
const fs = require('fs');
const listParser = require('./listParser');
const courseParser = require('./courseParser');

const FETCH_URL = `${process.env.BASE_FETCH_URL}&batch_size=${process.env.BATCH_SIZE}&sortorder=${process.env.SORT_ORDER}&search_ac_year=${process.env.SEARCH_YEAR}&parsergrp=0`

axios.get(FETCH_URL).then(res => {
  //let str = JSON.stringify(res.data);
  let buffer = Buffer.from(res.data);
  fs.writeFile(`${process.env.UNPARSED_LIST_PATH}`, buffer, 'utf8', (err) => {
    if (err) throw err;
    fs.readFile(`${process.env.UNPARSED_LIST_PATH}`, 'utf8', (err, data) => {  
      if (err) throw err;
      let arr = data.split(/[\r\n]+/g);

      /* Turn ugly file into array of course objects */
      let parsedList = listParser(arr);

      /* Need to get more data from each course page */
      courseParser(parsedList).then(res => {
        axios.post(process.env.DB_BASE_URL, { res }).then(res => {
          console.log("Saved all courses");
        }).catch(err => {
          console.log(err);
        });
      }).catch(res => {
        axios.post(process.env.DB_BASE_URL, { res }).then(res => {
          console.log("Failed somewhere, only partially saved courses in db");
        }).catch(err => {
          console.log(err);
        });
      });
  });
  })
})
.catch(err => {
  console.log('Error, scraper could not fetch list of courses');
  console.log(err);
})