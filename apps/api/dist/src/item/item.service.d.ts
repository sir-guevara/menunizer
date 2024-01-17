import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ItemService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createItemDto: CreateItemDto): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }>;
    findAll(id: string): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }>;
}
