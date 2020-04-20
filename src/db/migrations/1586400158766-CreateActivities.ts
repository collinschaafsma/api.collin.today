import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateActivities1586400158766 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TYPE "activity_type_enum" AS ENUM('STRAVA', 'GYM', 'OTHER')`,
    );
    
    await queryRunner.createTable(
      new Table({
        name: 'activities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v1mc()',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'activity_type_enum',
            isNullable: false,
          },
          {
            name: 'publishAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ]
      }),
    );  
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.dropTable('activities');
  }

}
