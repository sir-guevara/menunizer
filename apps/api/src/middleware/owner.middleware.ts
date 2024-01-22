// user-id.middleware.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OwnerMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params[0];
      console.log(req);
      if (!id) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      const plc = await this.prisma.place.findUnique({
        where: { id: id },
      });
      if (!plc) {
        throw new HttpException('Unauthorized', HttpStatus.NOT_FOUND);
      }
      req['place'] = plc;
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching place' });
    }
  }
}
