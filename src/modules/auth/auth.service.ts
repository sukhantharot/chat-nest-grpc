import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../strategy/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateJwt(payload: any) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '90d',
    });
    console.log(refreshToken);
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, refreshToken };
  }

  async signIn(user: any) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    // const userExists = await this.findUserByEmail(user.email);
    //
    // if (!userExists) {
    //   return this.registerUser(user);
    // }

    return this.generateAuthToken(user);
  }

  async generateAuthToken(user: any) {
    const payload = {
      sub: user.id || 1234,
      username: user.email,
    };
    const { accessToken, refreshToken } = await this.generateJwt(payload);
    const exp = this.jwtService.verify(accessToken).exp;
    return { accessToken, refreshToken, user, exp };
  }

  validateUser(payload: JwtPayload) {
    return this.prisma.user.findUnique({
      where: { id: payload.sub as number },
    });
  }

  async validateGoogleUser(googleUser: any) {
    // const user = await this.userService.findByEmail(googleUser.email);
    // if (user) return user;
    return googleUser;
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}
