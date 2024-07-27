const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logindata = require('./models/login');
const employee = require('./models/employee');
const employeeimage = require('./models/image')
const app=express();

const crosoptions= {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
app.use(cors(crosoptions));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
mongoose.connect('mongodb+srv://ktrinadhgv369:Giresh%40369@dns.cfujzaa.mongodb.net/dealdray?retryWrites=true&w=majority&appName=dns', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Error connecting to database:', err));

  app.listen('3001',()=>{
     console.log("server up and running in port at 3001 ")
  })

  
  app.get('/login/:name',async(req,res)=>{
    const name=req.params.name;
    try {
      const response = await logindata.findOne({f_username:name});
      if (!response) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(response)
      res.status(200).json({response})
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: "Failed to log in" });
    }
  })

  app.get('/email/:email',async(req,res)=>{
   const em=req.params.email
   try {
    const response=await employee.findOne({f_email:em});
    if(!response){
      res.status(200).json({data:response})
    }else{
      res.status(404).json({message:"employee already there"})
    }
   } catch (error) {
    res.status(500).json({message:error});
   }
  })

  app.get('/email',async(req,res)=>{
    try {
     const response=await employee.find({});
     console.log(response)
     if(response!=null){
       res.status(200).json({data:response})
     }else{
       res.status(404).json({message:"there is no data"})
     }
    } catch (error) {
     res.status(500).json({message:error});
    }
   })

   app.get('/image',async(req,res)=>{
    try {
     const response=await employeeimage.find({});
     if(response!=null){
       res.status(200).json({data:response})
     }else{
       res.status(404).json({message:"there is no data"})
     }
    } catch (error) {
     res.status(500).json({message:error});
    }
   })

  app.post('/signup',async (req,res)=>{
    const {username,password}=req.body;
    try {
      const response= await logindata.create({
        f_username:username,
        f_pwd:password
      })   
      res.status(200).json({message:"User Registerd Successfully"})
    } catch (error) {
      console.log("error in creating data base",error)
      res.status(500).json({message:error})
    }
  })

  app.post('/employee',async(req,res)=>{
    const {name,email,mobile,designation,gender,course}=req.body;
    try {
      const response = await employee.create({
        f_name:name,
        f_email:email,
        f_mobile:mobile,
        f_designation:designation,
        f_gender:gender,
        f_course:course,
        f_activate:false,
      })
      res.status(200).json({message:'employee created'})
    } catch (error) {
      console.log("error in creating data base",error)
      res.status(500).json({message:error})
    }
  })

  app.post('/image',async (req,res)=>{
    const {f_image,email,description,contenttype}=req.body;
    try {
      const response= await employeeimage.create({
       image:f_image,
       email:email,
       description:description,
       contenttype:contenttype
      })   
      res.status(200).json({message:"image Registerd Successfully"})
    } catch (error) {
      console.log("error in creating data base",error)
      res.status(500).json({message:error})
    }
  })

  app.put('/employee',async(req,res)=>{
    const {name,email,mobile,designation,gender,course}=req.body;
    try {
      const response = await employee.findOneAndUpdate({f_email:email},{
        f_name:name,
        f_email:email,
        f_mobile:mobile,
        f_designation:designation,
        f_gender:gender,
        f_course:course,
        f_activate:false,
      },{new: true})
      res.status(200).json({message:'employee updated'})
    } catch (error) {
      console.log("error in creating data base",error)
      res.status(500).json({message:error})
    }
    
  })

  app.put('/image',async(req,res)=>{
    const {f_image,email,description,contenttype}=req.body;
    try {
      const response= await employeeimage.findOneAndUpdate({email:email},{
       image:f_image,
       email:email,
       description:description,
       contenttype:contenttype
      },{new:true})   
      res.status(200).json({message:"image updated Successfully"})
    } catch (error) {
      console.log("error in creating data base",error)
      res.status(500).json({message:error})
    }
  })


app.delete('/employee', async (req, res) => {
  const { email } = req.body;
  try {
    console.log(req.body.email)
    await employee.deleteOne({ f_email: email });
    await employeeimage.deleteOne({ email:email });
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
