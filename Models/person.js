const mongoose = require("mongoose")
// const db1 = require("./db1");
const personSchema= new mongoose.Schema({
    
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        enum:["chief","cheif","manager","waiter"],
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

//     mobile:{
//         type:Number,
//         require:true
//     },
// email:{
//     type:String,
//     require:true,
//     unique:true
// } ,
// Address:{
//     type:String
// } ,
// Salary:{
//     type:Number,
//     require:true
// }  ,


})

const Person = mongoose.model('Person',personSchema)
module.exports=Person;