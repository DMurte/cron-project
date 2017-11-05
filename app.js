const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const moment = require('moment');
const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream('./renting.log', {flags : 'w'});
const log_stdout = process.stdout;

const queries = require('./queries');


console.log = (d) => { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

const app = express();

app.listen(3678, function() {
     simulacrum = cron.schedule('* *', async (() => {
         try {
            const success =  await (queries.mainQuery());
            console.log(`${success} , ${moment().tz('America/Bogota').format()} `)
         } catch(error) {
            console.log(`${error}, ${moment().tz('America/Bogota').format()} `)
         }
      }));
})
