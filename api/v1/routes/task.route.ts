import {Router,Request,Response} from "express"
const router:Router = Router();
import * as controller from "../controller/task.controller"

router.get("/",controller.index)

router.get("/detail/:id", controller.detail)

router.patch("/change-status/:id", controller.changeStatus)

router.patch("/change-multi", controller.changeMulti)

router.post("/create", controller.createPost)

router.patch("/edit/:id", controller.edit)

router.delete("/delete/:id", controller.deleteTask)

export const taskRoutes:Router = router; 