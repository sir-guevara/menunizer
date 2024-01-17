import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PlacesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(_createPlaceDto: CreatePlaceDto): import(".prisma/client").Prisma.Prisma__PlaceClient<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByOwner(ownerId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PlaceClient<{
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
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, _updatePlaceDto: UpdatePlaceDto): import(".prisma/client").Prisma.Prisma__PlaceClient<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PlaceClient<{
        id: string;
        name: string;
        ownerId: string;
        image: string;
        numberOfTables: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
