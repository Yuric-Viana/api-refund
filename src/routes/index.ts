import { Router } from "express";

import { testRoute } from "./test";

const route = Router()

route.use("/test", testRoute)

export { route }