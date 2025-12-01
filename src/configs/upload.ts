import multer from "multer";
import path from "node:path"
import crypto from "node:crypto"

// Essa é uma pasta temporária onde o arquivo ficará permitindo a manipulação desse arquivo antes de levá-lo para a pasta de uploads
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")

const UPLOAD_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MAX_SIZE_FOLDER = 1024 * 1024 * 3

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

export default {
    TMP_FOLDER,
    UPLOAD_FOLDER,
    MAX_SIZE_FOLDER,
    ACCEPTED_IMAGE_TYPES,
    MULTER
}