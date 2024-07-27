const express = require('express');
const mongoose=require('mongoose');
const mongoosesequence = require('mongoose-sequence')(mongoose);

const data= new mongoose.Schema({
      /*f_id:{
        type:Number,
        required:true
      }, */
      
      f_name:{
        type:String,
        required:true
      },
      f_email:{
        type:String,
        required:true
      },
      f_mobile:{
        type:Number,
        required:true
      },
      f_designation:{
        type:String,
        required:true
      },
      f_gender:{
        type:String,
        required:true
      },
      f_course:{
        type:String,
        required:true
      },
      f_date:{
        type:Date,
        default:Date.now
      },
      f_activate:{
        type:Boolean,
        required:true
      }
})
data.plugin(mongoosesequence, { inc_field: 'f_id' });

const employee = new mongoose.model('employee',data);

module.exports=employee;