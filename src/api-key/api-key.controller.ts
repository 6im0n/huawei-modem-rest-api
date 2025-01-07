import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api-key')
export class ApiKeyController {
  constructor(
    private apiKeyService: ApiKeyService,
    private prisma: PrismaService,
  ) {}

  @Post('generate')
  @UseGuards(AuthGuard) // Protect this endpoint so only authenticated users can generate keys
  async generateApiKey(
    @Body('userId') userId: string,
  ): Promise<{ apiKey: string }> {
    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }
    const apiKey = await this.apiKeyService.createApiKey(userId);
    return { apiKey };
  }

  @Post('validate')
  async validateApiKey(
    @Body('apiKey') apiKey: string,
  ): Promise<{ valid: boolean }> {
    if (!apiKey) {
      throw new HttpException('apiKey is required', HttpStatus.BAD_REQUEST);
    }
    const isValid = await this.apiKeyService.validateApiKey(apiKey);
    return { valid: isValid };
  }
}
