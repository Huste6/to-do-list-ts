import {Router} from "express"
const router:Router = Router();
import * as controller from "../controller/users.controller"
import * as authMiddleware from "../middleware/auth.middleware"

router.post("/register",controller.register)

router.post("/login",controller.login)

router.get("/detail",authMiddleware.RequestAuth,controller.detail)

export const userRoutes:Router = router; 