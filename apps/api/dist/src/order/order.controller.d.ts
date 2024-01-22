import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(request: any, placeId: string): {
        user: any;
        place: any;
        placeId: string;
    };
    findOne(id: string): string;
    update(id: string, updateOrderDto: UpdateOrderDto): import(".prisma/client").Prisma.Prisma__OrderClient<{
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
    remove(id: string): import(".prisma/client").Prisma.Prisma__OrderClient<{
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
