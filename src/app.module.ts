import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  applyDecorators,
} from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { UserModule } from './user/user.module'
import { GetIpMiddleware } from './middleware/get-ip.middleware'

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetIpMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
