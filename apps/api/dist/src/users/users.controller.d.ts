import { UsersService } from './users.service';
import { CreateUserDto } from 'src/auth/auth.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: CreateUserDto): Promise<{
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
