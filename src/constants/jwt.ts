import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConstants = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('AUTH_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_D', '7d'),
    },
  }),
  inject: [ConfigService],
};
