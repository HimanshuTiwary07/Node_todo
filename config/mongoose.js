const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test',{ useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error while connecting db'));

db.once('open',function(){
    console.log('Successfully connectd with database');
});
