import { Request, Response } from "express";
import { z } from 'zod'
import { UserRole } from "@prisma/client";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { AppError } from "@/utils/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "O nome é obrigatório." }),
            email: z.string().trim().email({ message: "E-mail inválido." }),
            password: z.string().trim().min(6, { message: "A senha deve ter ao menos 6 digítos." }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if (userWithSameEmail) {
            throw new AppError("Usuário já cadastrado com esse e-mail.")
        }

        const hashedPassword = await hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role
            }
        })

        return response.status(201).json()
    }

    async index(request: Request, response: Response) {
        const users = await prisma.user.findMany()

        return response.json(users)
    }
}

export { UserController }