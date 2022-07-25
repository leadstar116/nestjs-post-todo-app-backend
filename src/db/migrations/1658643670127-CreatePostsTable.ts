import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostsTable1658643670127 implements MigrationInterface {
  name = 'CreatePostsTable1658643670127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying(255), "user_id" integer, CONSTRAINT "PK_b3d3a3d234dabb9fc6f907ba42d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_efedd6953658f7488cb44c786ba" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_efedd6953658f7488cb44c786ba"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
