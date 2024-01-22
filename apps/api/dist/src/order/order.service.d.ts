import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(placeId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__OrderClient<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
