import {MigrationInterface, QueryRunner} from "typeorm";

export class firstDb1623312541526 implements MigrationInterface {
    name = 'firstDb1623312541526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gallary" ("id" SERIAL NOT NULL, "title" character varying(200), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_519f5434e3877b4bf82360e102b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "gallary"`);
    }

}
