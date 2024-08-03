import {Router} from "express"
const router:Router = Router();
import * as controller from "../controller/users.controller"

router.post("/register",controller.register)

export const userRoutes:Router = router; 