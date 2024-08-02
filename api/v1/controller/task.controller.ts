import {Request,Response} from "express"
import Task from "../models/task.model";

//[GET] /api/v1/tasks
export const index = async (req: Request,res: Response) => {
    //find
    interface Find{
        deleted:boolean,
        status?:string
    }
    const find:Find = {
        deleted:false
    }
    if(req.query.status){
        find.status = req.query.status.toString();
    }
    //end find
    
    //sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toString();
        sort[sortKey]=req.query.sortValue;
    }
    //end sort
    const tasks = await Task.find(find).sort(sort);
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