import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { IpLogService } from 'src/log/ip-log.service'

export class GetIpMiddleware implements NestMiddleware {
  constructor(private readonly ipLogService: IpLogService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const ips = {
      ip:
        req.headers['x-forwarded-for'] ||
        req.header['cf-connecting-ip'] ||
        req.header['x-real-ip'] ||
        '',
      ipRemote: req.socket.remoteAddress || '',
    }
    req.header['ips'] = ips

    next()
  }
}
