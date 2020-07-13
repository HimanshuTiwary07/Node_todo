// require node package for mongoose
const mongoose = require('mongoose');

// creating database schema
const mongo_schema = new mongoose.Schema({
    desc:{
        type : String,
        required : true
    },
   date:{
        type : String,
        required : true
    },
    category:{
        type : String,
        required : true
    }
});

// Exporting schema model
const todo_desc = mongoose.model('todo_desc',mongo_schema);

module.exports = todo_desc;