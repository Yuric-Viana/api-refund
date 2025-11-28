import { Router } from "express";

import { userRoute } from "./user-route";
import { sessionsRoute } from "./sessions-routes";

const route = Router()

route.use("/users", userRoute)
route.use("/sessions", sessionsRoute)

export { route }