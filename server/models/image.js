const express = require('express');
const mongoose=require('mongoose');

const image =  new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    description: String,
    contentType: String,
    email:{
        type:String,
        required:true
    }
})


const employeeimage= new mongoose.model('image',image);

module.exports=employeeimage;