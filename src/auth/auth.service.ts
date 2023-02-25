import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/payload.interface';
import { compare } from 'bcrypt';
import { EXPIRESIN } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto): Promise<boolean> {
    await this.usersService.create(dto);
    return true;
  }

  async login(dto: LoginUserDto) {
    const user = await this.usersService.findOne(dto.id);
    const areEqual = await compare(dto.password, user.password);

    if (!areEqual) {
      throw new UnauthorizedException('Неправильный пароль');
    }

    const token = this._createToken(user);

    return {
      user: user,
      ...token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new UnauthorizedException('Некорректный токен');
    }
    return user;
  }

  private _createToken({ id, name }: User): any {
    const expiresIn = EXPIRESIN;

    const user: JwtPayload = { id, name };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
