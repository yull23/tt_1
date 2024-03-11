import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'
import { Request } from 'express'

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
  getIp1(@Req() req: Request) {
    return req.header['ips']
  }

  @Post('login')
  async loginUser(
    @Body() data: { email: string; ips: { ip; ipRemote } },
    @Req() req: Request,
  ) {
    return await this.userService.loginUser({
      email: data.email,
      ips: req.header['ips'],
    })
  }
}
