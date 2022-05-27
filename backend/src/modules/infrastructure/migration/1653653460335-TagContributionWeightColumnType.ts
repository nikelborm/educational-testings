import { MigrationInterface, QueryRunner } from 'typeorm';

export class TagContributionWeightColumnType1653653460335
  implements MigrationInterface
{
  name = 'TagContributionWeightColumnType1653653460335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution" DROP COLUMN "weight"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution"
      ADD "weight" real NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution" DROP COLUMN "weight"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution"
      ADD "weight" integer NOT NULL
    `);
  }
}
