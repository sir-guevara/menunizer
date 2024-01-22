import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OwnerMiddleware implements NestMiddleware {
    private readonly prisma;
    constructor(prisma: PrismaService);
    use(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
