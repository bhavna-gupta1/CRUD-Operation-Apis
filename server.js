const express =require('express')
const app=express();
const db= require("./db");

const Person = require('./Models/person')
const { Guest, Room, Reservation, Payment, Staff } = require('./Models/personNew');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.post('/person',async(req,res)=>{
    try{
        const data =req.body;
        console.log(data)
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json({ message: 'Data added successfully' });
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
})
app.post('/Guest',async(req,res)=>{
  try{
    const Guestdata = req.body;
    console.log(Guestdata)
    const GuestRes = new Guest(Guestdata)
  const response2 = await GuestRes.save();
  console.log("Guest data saved ")
  res.status(200).json({message:"Guest added successfully"})

  }catch(err){
    res.status(500).json({message:"Something went wrong"})
  }
 
})




app.post('/bulk-insert/person', async (req, res) => {
    try {
      const data = req.body; // Assuming req.body is an array of objects
      const insertedPersons = await Person.insertMany(data);

      console.log(`${insertedPersons.length} persons inserted`);
      res.status(200).json({ message: `${insertedPersons.length} persons inserted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/get_person_details', async (req, res) => {
    try {
      const person = await Person.find()
      if (!person) {
        return res.status(404).send();
      }
      res.status(200).send(person);
      console.log(person)
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/delete_person',upload.none(), async (req, res) => {
    try {
        const id = req.body.id;
      const deletedPerson = await Person.findByIdAndDelete(id);
      console.log(deletedPerson)
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
      console.log("Data deleted");
      res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Route to handle deleting multiple persons by IDs
app.delete('/persons_delete_many_data', upload.none(), async (req, res) => {
    try {
      const personIds = req.body.id; // Assuming 'ids' is an array of IDs
      console.log(personIds)
      if (!Array.isArray(personIds)) {
        return res.status(400).json({ error: 'Invalid input, expected an array of IDs' });
      }
      const deleteResult = await Person.deleteMany({ _id: { $in: personIds } });
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'No persons found with the given IDs' });
      }
      console.log("Persons deleted");
      res.status(200).json({ message: `${deleteResult.deletedCount} persons deleted successfully` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.put('/update_person',async (req, res) =>{
    try{
        // const personId = req.params.id;
        const updateData=req.body;
        const updatedPerson = await Person.findByIdAndUpdate(updateData.id, updateData, { new: true });
    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log("Person updated");
    res.status(200).json({ message: 'Person updated successfully', data: updatedPerson });
  }
    catch (err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
  });
  app.put('/guest_update',async(req,res)=>{
    try{
    const data2=req.body
    console.log(data2);
    const dataup2 = await Guest.findByIdAndUpdate(data2.id,data2,{ new: true });
    console.log(dataup2)
    if(!dataup2){
      res.status(404).json({error:"Guest not found"});
      
    } console.log("guest updated");
    res.status(200).json({message:"Guest updated successfully",data:dataup2})
    }
    catch(err){
    res.status(500).json({error:"something went wrong"})
    }
    })

app.post("/person", async(req,res)=>{
    try{
     const data = req.body;
     const add_data = new Person(data)
     
    }
    catch(err){

    }
})
    


app.get('/first',function(req,res){
    var obj1=[{
        "name":'bhavna',
       " rollno":3,
       " age":22,
        "lname":"gupta"
    },{
        "name":'bhavna2',
       " rollno":32,
       " age":222,
        "lname":"gupta2"
    },{
        "name":'bhavna3',
       " rollno":32,
       " age":223,
        "lname":"gupta3"
    }]
    res.send(obj1)
})

app.listen(3000,()=>{
    console.log("server is listening")
})

app.delete("/Guest_del",async(req,res)=>{
  try{
    const id = req.body.id
    console.log(id)
    const delguest = await Guest.findByIdAndDelete(id)
    if(!delguest){
      res.status(404).json({message:"Person not found"})
    }
    console.log("Data deleted");
    res.status(200).json({ message: 'Data deleted successfully' });
  }catch(err){
    res.status(200).json({ message: 'Something went wrong' });
  }
})

app.get("/Guest_details",async(req,res)=>{
  try{
   const guest_data = await Guest.find()
   if (!guest_data) {
    return res.status(404).send();
  }
    
  }catch(err){

  }
})