import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { IpLogService } from 'src/log/ip-log.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly ipLogService: IpLogService,
  ) {}

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

  async loginUser(data: {
    email: string
    ips: { ip: string; ipRemote: string }
  }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      })
      //
      // Code: Authentication and authorization
      //
      // Code: Authentication and authorization
      const ip = await this.prisma.ipAddress.create({
        data: {
          ip: data.ips.ip,
          ipRemote: data.ips.ipRemote,
          users: {
            connect: {
              id: user.id,
            },
          },
        },
      })
      this.ipLogService.data(user.id, ip.id)
      console.log('Save')
    } catch (error) {
      console.log(error)
      throw new Error('Error creating user')
    }
  }
}
