//src/auth/auth.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<TokenDto> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    // If no user is found, throw an error
    if (!user) {
      throw new HttpException(
        'email or password incorrect',
        HttpStatus.NOT_FOUND,
      );
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
        username: username,
      }),
    };
  }
}
