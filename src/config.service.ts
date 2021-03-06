import { TypeOrmModuleOptions } from '@nestjs/typeorm';
class ConfigService {
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "abc@123",
      database: "gallary_project",
      synchronize:false,
      entities: ['dist/entities/**/*.entity.js'],
      migrations: ['dist/migration/**/*.js'],

      cli: {
        migrationsDir: 'src/migration',
      }
    };
  }

}

export default new ConfigService();