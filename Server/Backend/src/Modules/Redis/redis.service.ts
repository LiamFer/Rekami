import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import * as argon2 from 'argon2';
import { Response } from 'express';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;

  constructor() {
    if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
      throw new Error('Missing Redis configuration in environment variables.');
    }
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    });

    this.client.on('connect', () => {});

    this.client.on('error', (err) => {
      console.error('[Redis] Erro:', err);
    });
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<'OK'> {
    if (ttlInSeconds) {
      return this.client.set(key, value, 'EX', ttlInSeconds);
    }
    return this.client.set(key, value);
  }

  async setRefreshToken(userID: string, refreshToken: string, res: Response) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict', 
    });
    const hashedRefreshToken = await argon2.hash(refreshToken);
    return this.client.set(
      `refresh:${userID}`,
      hashedRefreshToken,
      'EX',
      60 * 60 * 24,
    ); // Expira em 1 dia tempo do RefreshToken
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
