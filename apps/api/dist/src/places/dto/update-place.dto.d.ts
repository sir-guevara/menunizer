import { CreatePlaceDto } from './create-place.dto';
declare const UpdatePlaceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePlaceDto>>;
export declare class UpdatePlaceDto extends UpdatePlaceDto_base {
    name: string;
    image: string;
    numberOfTables: number;
}
export {};
