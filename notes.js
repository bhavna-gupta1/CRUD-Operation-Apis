console.log("Good Morning")

var age =23;
var x ="gupta"
module.exports={
    age,x

}

var os =require('os')
var fs =require('fs')
var _ =require('lodash')
var note=require('./notes')

var result=os.userInfo();
console.log(result.username)

var age = note.age
var x =note.x
// console.log(fs)
let a =fs.appendFile('greeting.txt',"hi" + result.username+'\n',()=>{console.log('hello bhavn')});

console.log(age,x)
// let b =fs.appendFile('notes.js',"hi" + result.username+'\n',()=>{console.log('hello bhavn')});
const arr =[1,2,3,3,3,3,2,4,2]
console.log(_.uniq(arr))
