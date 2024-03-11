import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ScheduleModule } from '@nestjs/schedule'
import { IpLogService } from 'src/log/ip-log.service'

@Module({
  controllers: [UserController],
  providers: [UserService, IpLogService],
  imports: [PrismaModule, ScheduleModule.forRoot()],
})
export class UserModule {}
