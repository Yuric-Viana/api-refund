import { Router } from "express";

import multer from "multer";
import uploadsConfig from "@/configs/upload"
import { UploadsController } from "@/controllers/UploadsController";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadsConfig.MULTER)

uploadsRoutes.use(verifyUserAuthorization(["employee"]))
uploadsRoutes.post("/", upload.single("file"), uploadsController.create)

export { uploadsRoutes }