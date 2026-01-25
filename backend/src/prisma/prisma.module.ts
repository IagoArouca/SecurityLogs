import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso torna o PrismaService disponível em todo o projeto automaticamente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Essencial para outros módulos enxergarem
})
export class PrismaModule {}