import { Module } from '@nestjs/common';
import { Seed } from 'src/seed';
import { MongooseModule } from './mongoose.module';
import { SeederModule } from './seeder.module';
import { TypeOrmModule } from './typeorm.module';

@Module({
  imports: [TypeOrmModule, MongooseModule, SeederModule],
  providers: [Seed],
})
export class AppModule {}
