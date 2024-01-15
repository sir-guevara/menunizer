import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ username, password }: CreateUserDto): Promise<import("./auth.dto").TokenDto>;
}
