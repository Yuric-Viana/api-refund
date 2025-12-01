import { Request, response, Response } from "express";
import { prisma } from "@/database/prisma";
import { Category } from "@prisma/client";
import { z } from 'zod'
import { AppError } from "@/utils/AppError";

class RefundsController {
    async create(req: Request, res: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "O nome é obrigatório." }),
            category: z.enum([Category.food, Category.services, Category.others, Category.transport, Category.accomodation]),
            amount: z.number().positive({ message: "O número precisa ser positivo." }),
            filename: z.string().min(20)
        })

        const { name, amount, category, filename } = bodySchema.parse(req.body)

        const refunds = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: req.user.id
            }
        })

        return res.json(refunds)
    }

    async index(req: Request, res: Response) {
        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10),
        })

        const { name, page, perPage } = querySchema.parse(req.query)

        const skip = (page - 1) * perPage

        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                user: {
                    name: {
                        contains: name.trim()
                    }
                }
            },
            orderBy: { createdAt: "desc" },
            include: { user: true }
        })

        const totalRecords = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim()
                    }
                }
            },
        })

        const totalPages = Math.ceil(totalRecords / perPage)

        return res.json({
            refunds,
            pagination: {
                page,
                perPage,
                totalRecords,
                totalPages: totalPages > 0 ? totalPages : 1
            }
        })
    }

    async show(req: Request, res: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const refund = await prisma.refunds.findFirst({
            where: {
                id
            },
            include: {
                user: true
            }
        })

        return res.json(refund)
    }
}

export { RefundsController }