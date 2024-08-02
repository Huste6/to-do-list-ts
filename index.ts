import express,{Express,Request,Response} from "express"
import * as database from "./config/database"
import dotenv from "dotenv";
import Task from "./models/task.model";

dotenv.config();

database.connect();

const app:Express = express();
const port:string | number = process.env.PORT || 3000;

app.get("/tasks", async (req: Request,res: Response) => {
    const tasks = await Task.find({
        deleted:false
    })
    console.log(tasks);

    res.json({
        code:200,
        tasks: tasks
    });
})

app.get("/tasks/detail/:id", async (req: Request,res: Response) => {
    const id:string = req.params.id;

    const tasks = await Task.find({
        _id: id,
        deleted:false
    })
    res.json({
        code:200,
        tasks: tasks
    });
})
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})