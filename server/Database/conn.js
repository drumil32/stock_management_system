const mongoose = require('mongoose');

const DB = process.env.DATABASE;
// console.log(DB)
mongoose.connect(DB, {
    
}).then(() => {
    console.log(`connection is done`);
}).catch((err) => {
    console.log(`connection not done ${err}`);
});