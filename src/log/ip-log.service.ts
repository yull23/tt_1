import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaClient, User } from '@prisma/client'

@Injectable()
export class IpLogService {
  private logs: { userId: number; ipAddressId: number }[] = []
  private prisma = new PrismaClient()

  // Push element
  data(userId: number, ipAddressId: number) {
    this.logs.push({ userId, ipAddressId })
  }

  // Save batch
  @Cron(CronExpression.EVERY_5_SECONDS)
  async saveData() {
    console.log('Guardar')
    if (this.logs.length > 0) {
      const ipAddressesOnUsersInstances = this.logs.map(
        ({ userId, ipAddressId }) => ({
          userId,
          ipAddressId,
        }),
      )

      try {
        await this.prisma.ipAddressesOnUsers.createMany({
          data: ipAddressesOnUsersInstances,
        })

        console.log('Direcciones IP guardadas con éxito.')
      } catch (error) {
        console.error(error)
      } finally {
        this.logs = []
        console.log(23)
        await this.prisma.$disconnect()
      }
    }
  }
}
