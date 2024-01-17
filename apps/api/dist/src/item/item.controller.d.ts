import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(createItemDto: CreateItemDto): Promise<{
        id: string;
        name: string;
        image: string;
        price: number;
        categoryId: string;
        description: string;
        isAvailable: boolean;
    }>;
    findAll(placeId: string): Promise<{
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
