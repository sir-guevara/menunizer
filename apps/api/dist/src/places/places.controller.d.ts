import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
export declare class PlacesController {
    private readonly placesService;
    constructor(placesService: PlacesService);
    create(createPlaceDto: CreatePlaceDto, request: any): import(".prisma/client").Prisma.Prisma__PlaceClient<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        font: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(request: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        font: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(placeId: string): import(".prisma/client").Prisma.Prisma__PlaceClient<{
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
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(placeId: string, updatePlaceDto: UpdatePlaceDto): import(".prisma/client").Prisma.Prisma__PlaceClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(placeId: string): import(".prisma/client").Prisma.Prisma__PlaceClient<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        font: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
