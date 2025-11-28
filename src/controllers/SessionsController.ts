import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { sign } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

class SessionsController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            email: z.string().trim().email(),
            password: z.string().trim()
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.user.findFirst({ where: { email } })

        if(!user) {
            throw new AppError("E-mail e/ou senha inválidos.", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError("E-mail e/ou senha inválidos.", 401)
        }

        const { expiresIn, secret } = authConfig.jwt

        const token = sign({ role: user.role ?? "employee" }, secret, {
            subject: user.id,
            expiresIn
        })

        const { password: _, ...userWithoutPassword } = user

        return res.json({ 
            token,
            user: userWithoutPassword
         })
    }
}

export { SessionsController }