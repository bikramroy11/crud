const TaskModel= require("../Models/TaskModel");

//to create a task
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

//to Read all task
const fetchAllTasks= async(req, res)=>{
    try {
        const data= await TaskModel.find({});
        res.status(200).json({message:'all tasks are show', success:true, data});
    } catch (error) {
        res.status(500).json({message:'failed to create task', success:false});
    }
}

//to update task
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

//to delete task
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
    createTask,
    fetchAllTasks,
    upadteTaskById,
    deleteTaskById
}