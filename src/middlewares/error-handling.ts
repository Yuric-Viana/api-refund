import { ErrorRequestHandler, request, response } from "express"
import { AppError } from "@/utils/AppError"
import { ZodError } from "zod"

export const errorHandling: ErrorRequestHandler = (
    error, 
    request,
    response,
    next
) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    if (error instanceof ZodError) {
        return response.status(400).json({
            message: "Erro de validação.",
            issues: error.format()
        })
    }

    return response.status(500).json({
        message: "Erro interno do servidor."
    })
}