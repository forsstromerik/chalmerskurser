require('dotenv').load();
const axios = require('axios');
const fs = require('fs');
const listParser = require('./listParser');
const courseParser = require('./courseParser');

const FETCH_URL = `${process.env.BASE_FETCH_URL}&batch_size=${process.env.BATCH_SIZE}&sortorder=${process.env.SORT_ORDER}&search_ac_year=${process.env.SEARCH_YEAR}&parsergrp=0`

console.log('Scraper started. Fetching list...');

axios.get(FETCH_URL).then(res => {
  console.log('List retrieved. Parsing data.');
  let buffer = Buffer.from(res.data);
  fs.writeFile(`${process.env.UNPARSED_LIST_PATH}`, buffer, 'utf8', (err) => {
    if (err) throw err;
    fs.readFile(`${process.env.UNPARSED_LIST_PATH}`, 'utf8', (err, data) => {  
      if (err) throw err;
      let arr = data.split(/[\r\n]+/g);

      /* Turn ugly file into array of course objects */
      console.log('Creating course objects.');
      let parsedList = listParser(arr);

      /* Need to get more data from each course page */
      console.log('Scraping more info for each course. This will take a while...');
      courseParser(parsedList);
  });
  })
})
.catch(err => {
  console.log('Error, scraper could not fetch list of courses');
  console.log(err);
})