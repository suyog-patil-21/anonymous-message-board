const mongoose = require('mongoose');

const MONGO_URL = process.env.DB;

function connectDB() {
    mongoose.connect(MONGO_URL);
    let db = mongoose.connection;
    db.on('error',(err)=>{
        console.error(`Database Connection Error: ${err}`);
    })
}

module.exports = { connectDB };