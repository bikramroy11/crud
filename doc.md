# doc

# create 1 floder- backend

# in backend
1. npm init -y

2. npm i express mongoose dotenv body-parser cors nodemon
    <!-- 
    express → Web framework for creating the server.
    mongoose → ODM to interact with MongoDB.
    dotenv → Loads environment variables from a .env file.
    body-parser → Parses request bodies (JSON, URL-encoded)
    cors → Enables Cross-Origin Resource Sharing (lets frontend talk to backend). 
    -->
    then, npm start

3. create .env file 
        PORT=8080

4. backend/index.js
        const express= require('express');
        const app=express();
        require('dotenv').config(); //for .env file
        const port= process.env.PORT || 8080;
        app.listen(port, ()=>{
            console.log(`server is running on ${port}`);
        })

5. backend.package.json
        "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start":"nodemon index.js" //add this line
        },

4. backend/index.js
    app.get('/', (req, res)=>{
        res.send(`root router`);
    })

5. under backend folder we create
        Controller/ TaskController.js
        Router/ TaskRouter.js
        Models/ db.js, TaskModel.js

6. create a DB in mongodb and get the connection url and put into .env
    backend/ .env
    DB_URL=DB_URL=mongodb+srv://bikramroycs_toodo:bikramroycs_toodo@toodo.d90txra.mongodb.net/toodo?retryWrites=true&w=majority&appName=toodo
    # note: username & password same, after .net/ we write 'db_name' as   .net/toodo? 

7. backend/Models/db.js
        const mongoose=require('mongoose');
        const DB_URL=process.env.DB_URL;
        mongoose.connect(DB_URL)
            .then(()=>{
                console.log('mongoDB is connected......');
            }).catch((err)=>{
                console.log('mongoDB connection error', err);
            })

8. backend/index.js
        require('./Models/db'); //require database

9. backend/Models/TaskModel.js
        const mongoose=require('mongoose');
        const Schema=mongoose.Schema;
        const TaskSchema= new Schema({
            taskName:{
                type:String,
                required:true,
            },
            isDone:{
                type:Boolean,
                required:true,
            },
        });
        const TaskModel= mongoose.model('Todo', TaskSchema);
        module.exports=TaskModel;

10. backend/index.js
        const TaskRouter=require('./Routes/TaskRouter');
        const bodyParser=require('body-parser');
        app.use(bodyParser.json());
        
        app.use('/tasks', TaskRouter); //middleware for taskRouter

//-------------------------------------------------------------------------------------------
 11, 12 for create(C) a task

11. backend/Controller/TaskController.js
        const TaskModel= require("../Models/TaskModel");
        const createTask= async(req, res)=>{
            const data=req.body;
            try {
                const model= new TaskModel(data);
                await model.save();
                res.status(201).json({message:'task is created', success:true});
            } catch (error) {
                res.status(500).json({message:'failed to create task', success:false});
            }
        }
        module.exports={
            TaskModel
        }

12. backend/Routers/TaskRouter.js
        const router=require('express').Router();
        const {createTask}= require("../Controller/TaskController");
        router.post("/", createTask)  //to create a task- /tasks
        module.exports=router;

//-------------------------------------------------------------------------------------------
13, 14 for read(R) all task

13. backend/Controller/TaskController.js
        const fetchAllTasks= async(req, res)=>{
            try {
                const data= await TaskModel.find({});
                res.status(200).json({message:'all tasks are show', success:true, data});
            } catch (error) {
                res.status(500).json({message:'failed to fetch tasks', success:false});
            }
        }
        module.exports={
            fetchAllTasks
        }

14. backend/Routers/TaskRouter.js
        const {fetchAllTasks}= require("../Controller/TaskController");
        router.get('/', fetchAllTasks)

//-------------------------------------------------------------------------------------------
15, 16 for update(U) task

15. backend/Controller/TaskController.js
        const upadteTaskById= async(req, res)=>{
            try {
                const id= req.params.id;
                const body=req.body;
                const obj={$set:{...body}}; //copy by spread
                await TaskModel.findByIdAndUpdate(id, obj); //here, obj={$set:{...body}}
                res.status(200).json({message:'task is updated', success:true});
            } catch (error) {
                res.status(500).json({message:'failed to update task', success:false});
            }
        }
        module.exports={
            upadteTaskById
        }

16. backend/Routers/TaskRouter.js
        const {upadteTaskById}= require("../Controller/TaskController");
        router.put('/:id', upadteTaskById);

//-------------------------------------------------------------------------------------------
17, 18 for delete(D) task

17. backend/Controller/TaskController.js
        const deleteTaskById= async(req, res)=>{
            try {
                const id=req.params.id;
                await TaskModel.findByIdAndDelete(id);
                res.status(201).json({message:'the task is deleted', success:true});
            } catch (error) {
                res.status(500).json({message:'failed to delete the task', success:false});
            }
        }
        module.exports={
            deleteTaskById
        }

18. backend/Routers/TaskRouter.js
        const {deleteTaskById}= require("../Controller/TaskController");
        router.delete('/:id', deleteTaskById);

//--------------------------------------------------------------------------

# we create frontend by: npx create-react-app frontend
# in frontend
 
19. npm i bootstrap react-icons react-tostify
    then, npm start

20. remove all content of 
    frontend/src/  App.css, App.js (for App.js, then refce to get boilerplate)

21. frontend/src/index.js
        import 'bootstrap/dist/css/bootstrap.min.css';
        import 'bootstrap/dist/js/bootstrap.bundle.min';
        import 'react-toastify/dist/ReactToastify.css';