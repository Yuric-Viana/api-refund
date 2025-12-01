import { Router } from "express";

import { usersRoute } from "./users-route";
import { uploadsRoutes } from "./uploads-routes";
import { sessionsRoute } from "./sessions-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const route = Router()

// Rotas públicas
route.use("/users", usersRoute)
route.use("/sessions", sessionsRoute)

// Rotas privadas
route.use(ensureAuthenticated)
route.use("/refunds", refundsRoutes)
route.use("/uploads", uploadsRoutes)

export { route }