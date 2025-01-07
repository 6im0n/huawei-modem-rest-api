import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private prismaService: PrismaService,
  ) {}
  @Post('create')
  async createUser(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      displayName?: string;
    },
  ) {
    const { email, password, displayName } = createUserDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    try {
      const userRecord = await this.firebaseService.createUser(
        email,
        password,
        displayName,
      );
      await this.prismaService.user.create({
        data: {
          email: userRecord.email,
          firebaseId: userRecord.uid,
          name: userRecord.displayName,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return { message: 'User created successfully', user: userRecord };
    } catch (error) {
      throw new BadRequestException('error creating user: ' + error.message);
    }
  }
}
