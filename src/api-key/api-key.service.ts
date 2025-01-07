import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}

  async createApiKey(userId: string): Promise<string> {
    // Check if the user exists
    const userExists = await this.prisma.user.findUnique({
      where: { firebaseId: userId },
    });
    if (!userExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!userExists.authorized) {
      throw new HttpException('User not authorized', HttpStatus.FORBIDDEN);
    }
    const saltRounds = 10;
    const hashedUserId = await bcrypt.hash(userId, saltRounds);
    const payload = { userId: hashedUserId };
    const key = sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1y',
    });
    console.log(userId);
    console.log(hashedUserId);
    return key;
  }

  async validateApiKey(key: string): Promise<boolean> {
    const decoded = verify(key, process.env.JWT_SECRET);
    if (!decoded) return false;
    console.log(decoded);
    console.log(Date.now());
    const expiration = decoded['exp'];
    if (expiration < Date.now() / 1000)
      throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
    const hasedUserId = decoded['userId'];
    let isMatch = false;
    const users = await this.prisma.user.findMany();
    for (const user of users) {
      isMatch = await bcrypt.compare(user.firebaseId, hasedUserId);
      if (isMatch) {
        if (!user.authorized) {
          throw new HttpException(
            'User not authorized: ask to an admin to give you the permission',
            HttpStatus.FORBIDDEN,
          );
        }
        return true;
      }
    }
    throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  }
}
