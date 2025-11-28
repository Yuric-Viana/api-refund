import { Request, Response } from "express";

class RefundsController {
    async create(req: Request, res: Response) {
        return res.json({ message: "OK" })
    }
}

export { RefundsController }