import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private connection: Connection) {}

  @Get('health')
  async checkHealth() {
    try {
      const state = this.connection.readyState;
      return {
        status: 'ok',
        database: {
          connected: state === 1,
          state: ['disconnected', 'connected', 'connecting', 'disconnecting'][state],
        },
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}
