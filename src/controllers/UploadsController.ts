import { Request, Response } from "express"

class UploadsController {
    async create(req: Request, res: Response) {
        return res.json({ file: req.file })
    }
}

export { UploadsController }