import { Router } from "express";

import { userRoute } from "./user-route";
import { sessionsRoute } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const route = Router()

// Rotas públicas
route.use("/users", userRoute)
route.use("/sessions", sessionsRoute)

// Rotas privadas
route.use(ensureAuthenticated)
route.use("/refunds", refundsRoutes)

export { route }