import fs from "node:fs"
import path from "node:path"

import upload from "@/configs/upload"
import { AppError } from "./AppError"

class DiskStorage {
    async saveFile(file: string) {
        const tmpPath = path.resolve(upload.TMP_FOLDER, file)
        const destPath = path.resolve(upload.UPLOAD_FOLDER, file)

        try {
            await fs.promises.access(tmpPath)
        } catch (error) {
            throw new AppError(`Arquivo não encontrado: ${tmpPath}`)
        }

        await fs.promises.mkdir(upload.UPLOAD_FOLDER, { recursive: true })
        await fs.promises.rename(tmpPath, destPath)

        return file
    }

    async deleteFile(file: string, type: "tmp" | "upload") {
        const pathFile = type === "tmp" ? upload.TMP_FOLDER : upload.UPLOAD_FOLDER
        
        const filePath = path.resolve(pathFile, file)

        try {
            await fs.promises.stat(filePath)

        } catch (error) {
            throw error
        }

        await fs.promises.unlink(filePath)
    }
}

export { DiskStorage }