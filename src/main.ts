import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Seed } from './seed';

const greenColor = '\x1b[32m';

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then((context) => {
      const seeder = context.get(Seed);

      seeder
        .handle()
        .then(() => {
          console.log(`${greenColor}Seed completed`);
        })
        .catch((err) => console.error(err))
        .finally(() => context.close());
    })
    .catch((err) => {
      throw err;
    });
}

bootstrap();
