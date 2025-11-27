import { Request, Response } from "express";

class Test {
    async index(request: Request, response: Response) {
        return response.json({ message: "OK" })
    }
}

export { Test }