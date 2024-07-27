const express = require('express');
const mongoose=require('mongoose');

const login =  new mongoose.Schema({
    f_username:{
        type:String,
        required:true
    },
    f_pwd:{
        type:String,
        required:true
    }
})


const logindata= new mongoose.model('logindata',login);

module.exports=logindata;