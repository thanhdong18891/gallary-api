import {MigrationInterface, QueryRunner} from "typeorm";

export class secondDb1623312698868 implements MigrationInterface {
    name = 'secondDb1623312698868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "gallary" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallary" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gallary" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '2021-06-10 16:10:00.930532+08'`);
    }

}
