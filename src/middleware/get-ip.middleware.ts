import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import * as os from 'os'

export class GetIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip =
      req.headers['x-forwarded-for'] ||
      req.header['cf-connecting-ip'] ||
      req.header['x-real-ip'] ||
      ''
    req.headers['ip'] = ip
    req.headers['ipRemote'] = req.socket.remoteAddress
    next()
  }
}
