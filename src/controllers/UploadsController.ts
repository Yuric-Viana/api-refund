import { Request, Response } from "express"

class UploadsController {
    async create(req: Request, res: Response) {
        return res.json({ message: "OK" })
    }
}

export { UploadsController }