import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async createApiKey(userId: string, expiresAt: Date): Promise<string> {
    const key = randomBytes(32).toString('hex');
    await this.prisma.apiKey.create({
      data: {
        key,
        userId,
        expiresAt,
      },
    });
    return key;
  }

  async validateApiKey(key: string): Promise<boolean> {
    const apiKey = await this.prisma.apiKey.findUnique({ where: { key } });
    if (!apiKey) return false;

    // Check expiration
    if (new Date() > apiKey.expiresAt) {
      return false;
    }

    return true;
  }
}
