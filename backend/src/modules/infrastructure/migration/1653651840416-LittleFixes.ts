import { MigrationInterface, QueryRunner } from 'typeorm';

export class LittleFixes1653651840416 implements MigrationInterface {
  name = 'LittleFixes1653651840416';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module"
      ADD "description" character varying
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_answer_option"
      ALTER COLUMN "answer"
      SET NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "abstract_answer_option"
      ALTER COLUMN "answer" DROP NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module" DROP COLUMN "description"
    `);
  }
}
