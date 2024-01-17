import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
export declare class OwnerMiddleware implements NestMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    use(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
