import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from 'src/api-key/api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      return false;
    }

    return this.apiKeyService.validateApiKey(apiKey);
  }
}
