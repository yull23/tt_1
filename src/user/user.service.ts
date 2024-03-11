import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { error } from 'console'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: User) {
    try {
      return await this.prisma.user.create({ data })
    } catch (error) {
      console.log(error)
      throw new Error('Error creating user')
    }
  }
  async getAllUser(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }
}
