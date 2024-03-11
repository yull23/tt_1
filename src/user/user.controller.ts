import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
