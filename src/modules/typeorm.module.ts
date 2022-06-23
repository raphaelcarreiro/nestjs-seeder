import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule as TypeOrmModuleConfig } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModuleConfig.forRoot({
      type: 'mysql',
      host: `${process.env.DB_HOST}`,
      port: 3306,
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_SCHEMA}`,
      autoLoadEntities: true,
    }),
  ],
})
export class TypeOrmModule {}
