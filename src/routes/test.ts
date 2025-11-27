import { Router } from "express";

import { Test } from "../controllers/test";

const testRoute = Router()
const test = new Test()

testRoute.get("/", test.index)

export { testRoute }