import { Router } from "express";

import { userRoute } from "./user-route";
import { sessionsRoute } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";

const route = Router()

// Rotas públicas
route.use("/users", userRoute)
route.use("/sessions", sessionsRoute)

// Rotas privadas
route.use("/refunds", refundsRoutes)

export { route }