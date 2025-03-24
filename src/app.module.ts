import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGODB_USERNAME');
        const password = configService.get('MONGODB_PASSWORD');
        const host = configService.get('MONGODB_HOST');
        const port = configService.get('MONGODB_PORT');
        const database = configService.get('MONGODB_DATABASE');

        const uri = username && password
          ? `mongodb://${username}:${password}@${host}:${port}/${database}`
          : `mongodb://${host}:${port}/${database}`;

        return {
          uri,
          authSource: 'admin',
        };
      },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
