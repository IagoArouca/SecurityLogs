
import { Test , TestingModule} from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  const mockUser = {
    id: 'uuid-123',
    email: 'test@test.com',
    password: 'senha_criptografada_no_banco',
    name: 'Iago Test'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('token_fake'),
          },
        },
        {
          provide: PrismaService,
          useValue:{
            log: { create: jest.fn() }
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('deve retornar um token e dados do usuário quando o login for bem sucedido', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as any);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true)
    const result = await service.signIn('test@test.com', 'senha123', '127.0.0.1')

    expect(result).toHaveProperty('access_token')
    expect(bcrypt.compare).toHaveBeenCalled();
  });

  it('deve lançar UnauthorizedException quando a senha estiver incorreta', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser as any);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false)

    await expect(service.signIn('test@dev.com', 'senha_errada'))
      .rejects
      .toThrow(UnauthorizedException);
  })

  
});