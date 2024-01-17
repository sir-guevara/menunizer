import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(_createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        placeId: string;
    }>;
    findAll(id: string): Promise<({
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
    })[]>;
    findOne(id: string): Promise<({
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
    })[]>;
    update(id: string, _updateCategoryDto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        placeId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        placeId: string;
    }>;
}
