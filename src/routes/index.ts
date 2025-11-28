import { Router } from "express";

import { userRoute } from "./user-route";

const route = Router()

route.use("/users", userRoute)

export { route }