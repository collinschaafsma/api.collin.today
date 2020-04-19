import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateIntegrations1587250182675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
          new Table({
            name: 'integrations',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                default: 'uuid_generate_v1mc()',
              },
              {
                name: 'key',
                type: 'varchar',
                isNullable: false,
                isUnique: true
              },
              {
                name: 'userId',
                type: 'uuid',
                isNullable: false,
                isUnique: true,
              },
              {
                name: 'accessToken',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'refreshToken',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'authorizeUrl',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'acessTokenUrl',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'clientId',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'secret',
                type: 'varchar',
                isNullable: false,
              }, 
              {
                name: 'accessTokenExpiresAt',
                type: 'timestamp',
                isNullable: false,
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
        return queryRunner.dropTable('integrations');
      }

}
