import { ConnectionOptions } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const logging: LoggerOptions =
  configService.get<string>('APP_ENV') === 'production'
    ? ['error']
    : ['error', 'query', 'schema'];

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOSTNAME', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'collintoday'),
  password: configService.get<string>('DB_PASSWORD', 'collintoday'),
  database: configService.get<string>('DB_NAME', 'collintoday_development'),

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,

  logging,
  
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/db/migrations',
  },
};

export = config;