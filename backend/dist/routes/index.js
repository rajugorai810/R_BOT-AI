import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chats-route.js";
const appRouter = Router();
appRouter.use("/user", userRoutes); // domain/api/v1/users
appRouter.use("/chats", chatRoutes); // domain/api/v1/chats
export default appRouter;
//# sourceMappingURL=index.js.map