const router=require('express').Router();
const {createTask, fetchAllTasks, upadteTaskById, deleteTaskById}= require("../Controller/TaskController");

//to create a task- /tasks
router.post("/", createTask)


//to get all the task
router.get('/', fetchAllTasks)

//to get update the task
router.put('/:id', upadteTaskById)

//to get delete the task
router.delete('/:id', deleteTaskById)

module.exports=router;