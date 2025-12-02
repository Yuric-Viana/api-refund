import { Request, Response } from "express"
import { DiskStorage } from "@/utils/DiskStorage"
import { z, ZodError } from "zod"

import uploadConfigs from '@/configs/upload'
import { AppError } from "@/utils/AppError"
class UploadsController {
    async create(req: Request, res: Response) {
        const diskStorage = new DiskStorage()

        try {
            const fileSchema = z.object({
                filename: z.string().min(1, "Arquivo é obrigatório."),
                mimetype: z.string().refine((type) => uploadConfigs.ACCEPTED_IMAGE_TYPES.includes(type), `Formato do arquivo não permitido. Formatos permitidos: ${uploadConfigs.ACCEPTED_IMAGE_TYPES}`),
                size: z.number().positive().refine((size) => size <= uploadConfigs.MAX_SIZE_FOLDER, `Tamanho do arquivo excede o permitido. Tamanho permitido: ${uploadConfigs.MAX_SIZE}MB`)
            }).passthrough()

            const file = fileSchema.parse(req.file)
            const fileName = await diskStorage.saveFile(file.filename)

            res.json(fileName)
        } catch (error) {
            if (error instanceof ZodError) {
                if (req.file) {
                    await diskStorage.deleteFile(req.file.filename, "tmp")
                }

                throw new AppError(error.issues[0].message)
            }

            throw error
        }
    }
}

export { UploadsController }