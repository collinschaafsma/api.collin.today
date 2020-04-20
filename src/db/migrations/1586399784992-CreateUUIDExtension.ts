import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUUIDExtension1586399784992 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"');
  }

}
