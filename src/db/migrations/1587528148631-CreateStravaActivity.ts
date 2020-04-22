import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStravaActivity1587528148631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
              name: 'stravaActivities',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'uuid_generate_v1mc()',
                },
                {
                  name: 'activityId',
                  type: 'uuid',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'distance',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'movingTime',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'elapsedTime',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'totalElevationGain',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'stravaType',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'externalId',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'startDate',
                  type: 'timestamp',
                  isNullable: false,
                },
                {
                  name: 'mapSummaryPolyline',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'mapPolyline',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'averageSpeed',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'maxSpeed',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'averageCadence',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'averageWatts',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'weightedAverageWatts',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'maxWatts',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'kilojoules',
                  type: 'decimal',
                  isNullable: true,
                },
                {
                  name: 'averageHeartRate',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'maxHeartRate',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'sufferScore',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'calories',
                  type: 'integer',
                  isNullable: true,
                },
                {
                  name: 'embedToken',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'deviceName',
                  type: 'varchar',
                  isNullable: true,
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
      return queryRunner.dropTable('stravaActivities');
    }

}
