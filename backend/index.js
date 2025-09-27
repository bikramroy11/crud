const express= require('express');
const app=express();
require('dotenv').config(); //for .env file
const port= process.env.PORT || 8080;
//-------------------------------------------------
require('./Models/db'); //require database

//-------------------------------------------------
const TaskRouter=require('./Routes/TaskRouter');
const bodyParser=require('body-parser');

//--------------------------------------------------

app.get('/', (req, res)=>{
    res.send(`root router`);
})

app.use(bodyParser.json());
app.use('/tasks', TaskRouter);


app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})