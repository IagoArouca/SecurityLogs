import { Controller, Post, Body, HttpCode, HttpStatus, Ip } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: any, @Ip() ip: string) {
        return this.authService.signIn(signInDto.email, signInDto.password, ip);
  }
}
