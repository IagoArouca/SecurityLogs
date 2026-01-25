import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { access } from 'fs';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValue({
      access_token: 'token-fake',
      user: {id: '1', name: 'iago', email: 'usuariodev@hotmail.com' }
    }),
  }

  beforeEach(async  () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  })

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar o método signIn do service com os dados corretos', async () => {
    const loginDto = { email: 'usuariodev@hotmail.com', password: 'password123'}
    const ip = '127.0.0.1';

    const result = await controller.signIn(loginDto, ip as any);

    expect(service.signIn).toHaveBeenCalledWith(
      loginDto.email,
      loginDto.password,
      ip
    );

    expect(result).toHaveProperty('access_token');
  });

  it('deve repassar a exceção quando o AuthService falhar', async () => {
    jest.spyOn(service, 'signIn').mockRejectedValue(new UnauthorizedException());

    await expect(controller.signIn({ email: 'errado@test.com', password: '123' }, '127.0.0.1' as any))
    .rejects
    .toThrow(UnauthorizedException);
  })
});
