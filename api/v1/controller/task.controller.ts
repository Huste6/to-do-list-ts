import {Request,Response} from "express"
import Task from "../models/task.model";

//[GET] /api/v1/tasks
export const index = async (req: Request,res: Response) => {
    const tasks = await Task.find({
        deleted:false
    })
    res.json({
        code:200,
        tasks: tasks
    });
}
//[GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request,res: Response) => {
    const id:string = req.params.id;
    const tasks = await Task.find({
        _id: id,
        deleted:false
    })
    res.json({
        code:200,
        tasks: tasks
    });
}