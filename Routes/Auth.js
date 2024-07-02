const express =require("express")
const passport=require("passport")
const LocalStrategy = require("passport-local").Strategy;
const Person = require('../Models/person')

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
  
      if (!user) 
        // If user is not found, return "Incorrect username" message
        return done(null, false, { message: "Incorrect username." });
      
  
      const isPasswordValid = user.password === password;
  
      if (!isPasswordValid) 
        // If password is incorrect, return "Incorrect password" message
        return done(null, false, { message: "Incorrect password." });
      
  
      // If both username and password are correct, return the user object
      return done(null, user);
    } catch (err) {
      // If an error occurs, return the error
      return done(err);
    }
  }));
  module.exports = passport