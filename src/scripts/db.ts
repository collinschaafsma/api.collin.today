#!/usr/bin/env yarn ts-node

import { exec } from 'child_process';
import { promisify } from 'util';

import * as ormconfig from '../db/config';

interface PGConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

async function run(): Promise<void> {
  const config: PGConfig = ormconfig as PGConfig;

  const query =
    process.argv[process.argv.length - 1] === 'drop'
      ? `DROP DATABASE ${config.database};`
      : `CREATE DATABASE ${config.database};`;

  const cmd = [
    'psql',
    `-h ${config.host}`,
    `-p ${config.port}`,
    `-U ${config.username}`,
    '-d postgres',
    `-c '${query}'`,
  ];

  const env = Object.assign(process.env, { PGPASSWORD: config.password });
  const sql = cmd.join(' ');

  console.error(`Executing query: "${sql}"`);
  await promisify(exec)(cmd.join(' '), { env });
}

run().catch(console.error).finally(process.exit);