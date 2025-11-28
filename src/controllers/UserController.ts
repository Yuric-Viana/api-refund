import { Request, Response } from "express";
import { z } from 'zod'
import { UserRole } from "@prisma/client";

class UserController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "O nome é obrigatório." }),
            email: z.string().trim().email({ message: "E-mail inválido." }),
            password: z.string().trim().min(6, { message: "A senha deve ter ao menos 6 digítos." }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        return response.json({ name, email, password, role })
    }
}

export { UserController }