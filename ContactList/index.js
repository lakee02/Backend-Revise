const express=require('express');
const path=require('path');
const { brotliDecompressSync } = require('zlib');
const port = 8000;

//Add DB
const db=require('./Config/mongoose');

const Contact=require('./Models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
  //Parser
app.use(express.urlencoded());

app.use(express.static('assets'));

var contactList = [
    {
        name:"Arpan",
        phone: "111111111"
    },
    {
        name:"Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "2341679236"
    }
]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('Cool, it is running! or is it');

    Contact.find({},function(err,contact){
        if(err){
            console.log('error in fetching contacts in db')
        }
        return res.render('home',{
            title:"Contact List",
            contact_list: contact
        });
    });

    // return res.render('home',{
    //     title:"Contact List",
    //     contact_list: contactList
    // });
});

  // Parse data to contactList
app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('***********',newContact);
        return res.redirect('back');
    });
    // return res.redirect('/');
});

app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    // let phone=req.query.phone;

    // get the id from query in the ul
      let id=req.query.id;

    // Find the contact in the db using id and delete
      Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an onject from Database');
            return;
        }
        return res.redirect('back');
      });
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    // return res.redirect('back');
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let Us Play With EJS"
    })
})



app.listen(port,function(err){
    if(err){
        console.log('Error in running the server : ',err);
        return;
    }
    console.log('Yup!My Express Server is running on port : ',port);
});