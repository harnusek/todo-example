const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateUserItemList1717240919126 {
  name = 'CreateUserItemList1717240919126';

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "login" character varying(20) NOT NULL,
                "password" character varying(60) NOT NULL,
                CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "list" (
                "id" SERIAL NOT NULL,
                "name" character varying(20) NOT NULL,
                CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."item_flag_enum" AS ENUM('active', 'done', 'cancelled', 'expired')
        `);
    await queryRunner.query(`
            CREATE TABLE "item" (
                "id" SERIAL NOT NULL,
                "title" character varying(20) NOT NULL,
                "text" character varying NOT NULL DEFAULT '',
                "deadline" TIMESTAMP WITH TIME ZONE NOT NULL,
                "flag" "public"."item_flag_enum" NOT NULL DEFAULT 'active',
                "listId" integer,
                "createdById" integer NOT NULL,
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_lists_list" (
                "userId" integer NOT NULL,
                "listId" integer NOT NULL,
                CONSTRAINT "PK_ac51f6145eb20b9390cf4f7442b" PRIMARY KEY ("userId", "listId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_ca37e593473d3b70e941a9f8f1" ON "user_lists_list" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_56cc5740e5acd4ec2cb34587bf" ON "user_lists_list" ("listId")
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_7bd5f4d3ef52bfaa138ada4cf81" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "item"
            ADD CONSTRAINT "FK_23842f1bc57d2d527bbf6d14d8d" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_lists_list"
            ADD CONSTRAINT "FK_ca37e593473d3b70e941a9f8f16" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_lists_list"
            ADD CONSTRAINT "FK_56cc5740e5acd4ec2cb34587bf4" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "user_lists_list" DROP CONSTRAINT "FK_56cc5740e5acd4ec2cb34587bf4"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_lists_list" DROP CONSTRAINT "FK_ca37e593473d3b70e941a9f8f16"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_23842f1bc57d2d527bbf6d14d8d"
        `);
    await queryRunner.query(`
            ALTER TABLE "item" DROP CONSTRAINT "FK_7bd5f4d3ef52bfaa138ada4cf81"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_56cc5740e5acd4ec2cb34587bf"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_ca37e593473d3b70e941a9f8f1"
        `);
    await queryRunner.query(`
            DROP TABLE "user_lists_list"
        `);
    await queryRunner.query(`
            DROP TABLE "item"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."item_flag_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "list"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
};
