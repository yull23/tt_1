import { NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import * as os from 'os'

export class GetIpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const localIp = this.getLocalIpAddress()
    const ip =
      req.headers['x-forwarded-for'] ||
      req.header['cf-connecting-ip'] ||
      req.header['x-real-ip'] ||
      req.socket.remoteAddress ||
      ''
    req.ip = localIp
    next()
  }

  private getLocalIpAddress(): string {
    const interfaces = os.networkInterfaces()
    for (const interfaceName in interfaces) {
      const interfaceInfo = interfaces[interfaceName]
      for (const info of interfaceInfo) {
        if (info.family === 'IPv4' && !info.internal) {
          return info.address
        }
      }
    }
    return 'Unknown'
  }
}
