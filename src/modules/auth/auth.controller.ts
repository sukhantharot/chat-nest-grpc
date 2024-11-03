import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from '../../guard/google-oauth.guard';
import { Public } from '../../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.signIn(req);
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleCallback(@Req() req, @Res() res) {
    const response = await this.authService.signIn(req.user);
    res.redirect(
      `http://localhost:3000/api/auth/callback/nest?token=${response.accessToken}`,
    );
  }
}
