import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    // 1. Verifique se o 'ip' está declarado aqui nos parâmetros!
    async signIn(email: string, pass: string, ip?: string) {
        const user = await this.usersService.findByEmail(email);

        const isMatch = user ? await bcrypt.compare(pass, user.password) : false;

        // 2. Aqui o Prisma usará o 'ip' que vem do parâmetro acima
        await this.prisma.log.create({
            data: {
                event: isMatch ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE',
                userEmail: email,
                ip: ip || 'unknown',
                severity: isMatch ? 'LOW' : 'HIGH', 
                userId: user?.id || null, 
                location: 'Localização via IP (Mock)', 
            }
        });

        if (!user || !isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}