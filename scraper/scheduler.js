const cron = require('node-cron');
const scraper = require('./scraper');

console.log('Scheduler started');

/* Run scraper service first day of every month */
cron.schedule('0 1 1 * *', () => {
  scraper();
})