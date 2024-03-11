import { Body, Controller, Get, Ip, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAllUser() {
    return this.userService.getAllUser()
  }

  @Post()
  createUser(@Body() data: User) {
    return this.userService.createUser(data)
  }

  @Get('ip')
  getIp1() {}
}
