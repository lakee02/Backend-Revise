// Require the library
const mongoose=require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

// aquire the connection (if it is succesfull)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the message
db.once('open',function(){
    console.log('Succesfully connected to the Database');
});

