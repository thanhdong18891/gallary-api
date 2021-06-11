import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configService from './config.service';
import * as fs from 'fs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(async (req: Request, res: Response, next) => {
  //   await TryDBConnect(() => {}, next);
  // });
  fs.writeFileSync('ormconfig.json',
  JSON.stringify(configService.getTypeOrmConfig(), null, 2)
  );
  await app.listen(3000);
}
bootstrap();
