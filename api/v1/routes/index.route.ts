import { Express } from "express";
import { taskRoutes } from "./task.route";
import { userRoutes } from "./users.route";
import * as  authMiddleware from "../middleware/auth.middleware"

const mainV1Routes = (app: Express):void => {
    const version = '/api/v1';

    app.use(version + '/tasks',authMiddleware.RequestAuth,taskRoutes);

    app.use(`${version}/users`,userRoutes);
}

export default mainV1Routes;