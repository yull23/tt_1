import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { PrismaClient, User } from '@prisma/client'

@Injectable()
export class IpLogService {
  private logs: { userId: Number; ipAddressId: Number }[] = []
  private prisma = new PrismaClient()

  data(userId: Number, ipAddressId: Number) {
    this.logs.push({ userId, ipAddressId })
  }

  @Cron('0 * * * *')
  async saveData() {
    if (this.logs.length > 0) {
      // Code: save data
      const uniqueUserIds = [...new Set(this.logs.map((log) => log.userId))]
      const uniqueIpAddressIds = [
        ...new Set(this.logs.map((log) => log.ipAddressId)),
      ]
      const ipAddressesOnUsersInstances = this.logs.map(
        ({ userId, ipAddressId }) => ({
          userId,
          ipAddressId,
        }),
      )
      console.log(ipAddressesOnUsersInstances)

      // Code: Clean array
      this.logs = []
    }
  }
}
