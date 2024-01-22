import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, placeId: string, request: any): Promise<{
        id: string;
        name: string;
        placeId: string;
    }>;
    findAll(placeId: string): Promise<({
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
    findOne(id: string, request: any): Promise<({
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
    update(id: string, updateCategoryDto: UpdateCategoryDto, request: any): Promise<{
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
