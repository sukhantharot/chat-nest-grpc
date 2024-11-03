import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class GoogleTokenGuard implements CanActivate {
  private oauthClient: OAuth2Client;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    this.oauthClient = new OAuth2Client(
      this.configService.get<string>('AUTH_GOOGLE_ID'),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('No authorization token provided');
    }

    const idToken = authorizationHeader.split(' ')[1]; // Expecting "Bearer <id_token>"
    if (!idToken) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      // Verify the token using Google’s OAuth2Client
      const ticket = await this.oauthClient.verifyIdToken({
        idToken,
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'), // Ensure it matches your client ID
      });
      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Invalid Google token');
      }
      const user = await this.authService.findByEmail(payload.email);
      request.user = {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        sub: payload.sub,
        id: user?.id,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired Google token');
    }
  }
}
