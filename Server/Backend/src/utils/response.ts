import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class ResUtil {
  static sendResponse(
    res: Response, 
    statusCode: HttpStatus, 
    message?: string, 
    data?: any, 
    error?: any,
    cookieOptions?: { name: string; value: string; options?: any }
  ): Response {
    if (cookieOptions) {
      res.cookie(cookieOptions.name, cookieOptions.value, cookieOptions.options);
    }

    return res.status(statusCode).json({
      statusCode,
      message: message ?? HttpStatus[statusCode],
      ...(data !== undefined && { data }),
      ...(error !== undefined && { error }),
    });
  }
}
