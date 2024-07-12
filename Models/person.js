const mongoose = require("mongoose")
// const db1 = require("./db1");
const bcrypt = require('bcrypt')
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

personSchema.pre('save', async function(next) {
    const person = this;
    console.log("pre-save middleware triggered"); // Check if this logs

    // Hash the password only if it has been modified (or is new)
    if (!person.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        console.log(person.password)
        console.log("Password hashed:", hashedPassword); // Log the hashed password
        next();
    } catch (err) {
        next(err);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};


const Person = mongoose.model('Person',personSchema)
module.exports=Person;