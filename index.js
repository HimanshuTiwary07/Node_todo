// package imported
    // -mongoose
    // -express
    // -Config
    // -Path
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/mongoose');
const path = require('path');

// Set Server Port
const port = process.env.PORT || 3000;

const app = express();

// Model imported
const todo_desc = require('./models/contact');
const { json } = require('express');

// View Engine set to Ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());

// assets folder include json,css image files
app.use(express.static('assets'));

// Get Data from DB and render it over the page
app.get('/',function(req, res){
    
    todo_desc.find({}, function(err, newtodo){
        if(err){
            console.log('Error in fetching');
            return;
        }
        return res.render('home', {
            title: "ToDo_List",
            todo_desc: newtodo
        });
    });
});


app.get('/list',function(req, res){
    
    todo_desc.find({}, function(err, newtodo){
        if(err){
            console.log('Error in fetching');
            return;
        }
    
        return res.render('home', {
            title: "ToDo_List",
            todo_desc: newtodo
        });
    });
});

// Delete Funtion using query/params ,Select by ID. Where delete_list is colection name
app.get('/delete_list', function(req,res){
    //console.log(req.params)
       // let desc = req.query.desc;
    let id = req.query.id;

    todo_desc.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting');
            return;
        }

        return res.redirect('back');
    });
});

// Colection to render on the page
app.get('/list', function(req,res){
    return res.render('list', {
        title: " lets add list here"
    });
});

// creating create-list collection, used to add list to database as well as on the page
app.post('/create-list', function(req, res){
    todo_desc.create({
        desc: req.body.desc,
        date: req.body.date,
        category: req.body.category
    },function(err,newtodo){
        if(err){
            console.log('ERROR');
    return ;}
        console.log('******',newtodo);
        return res.redirect('back');
    });
});

// Creating Express server
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on Port:${port}`);
});
