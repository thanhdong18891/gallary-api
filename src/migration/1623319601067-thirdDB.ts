import {MigrationInterface, QueryRunner} from "typeorm";

export class thirdDB1623319601067 implements MigrationInterface {
    name = 'thirdDB1623319601067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "title" character varying(200), "url" character varying(200), "gallaryId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_91219e6bdd8b2294cb96b62c0a8" FOREIGN KEY ("gallaryId") REFERENCES "gallary"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_91219e6bdd8b2294cb96b62c0a8"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
