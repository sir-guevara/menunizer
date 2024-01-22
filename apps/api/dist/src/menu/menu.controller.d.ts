import { MenuService } from './menu.service';
import { CreateOrderDto } from './dto/create-menu.dto';
import { UpdtateOrderDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    CreatePaymentTheIntent(payment: CreateOrderDto, placeId: string, req: Request): Promise<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMenu(placeId: string): Promise<{
        categories: ({
            items: {
                id: string;
                name: string;
                image: string;
                price: number;
                categoryId: string;
                description: string;
                isAvailable: boolean;
            }[];
        } & {
            id: string;
            name: string;
            placeId: string;
        })[];
    } & {
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        font: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: string): string;
    update(id: string, updtateOrderDto: UpdtateOrderDto): Promise<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        placeId: string;
        table: number;
        detail: string;
        paymentIntent: string;
        amount: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
