import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameAccessTokenUrl1587254274212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "integrations" RENAME COLUMN "acessTokenUrl" TO "accessTokenUrl"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "integrations" RENAME COLUMN "accessTokenUrl" TO "acessTokenUrl"`);
    }

}
