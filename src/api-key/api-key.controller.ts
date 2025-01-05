import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { AuthGuard } from 'src/auth/auth.guard'; // Example guard for authentication

@Controller('api-key')
export class ApiKeyController {
  constructor(private apiKeyService: ApiKeyService) {}

  @Post('generate')
  @UseGuards(AuthGuard) // Protect this endpoint so only authenticated users can generate keys
  async generateApiKey(
    @Body('userId') userId: string,
  ): Promise<{ apiKey: string }> {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // Set expiration to 1 year

    const apiKey = await this.apiKeyService.createApiKey(userId, expiresAt);
    return { apiKey };
  }
}
