import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendedUserGroupManagementAccessScopeType1653669295866
  implements MigrationInterface
{
  name = 'ExtendedUserGroupManagementAccessScopeType1653669295866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "UQ_ef6901670e104115fc7f29de55e"
    `);
    await queryRunner.query(`
      ALTER TYPE "public"."user_group_management_access_scope_type_enum"
      RENAME TO "user_group_management_access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."user_group_management_access_scope_type_enum" AS ENUM(
        'inviteUsers',
        'removeUsers',
        'viewUsers',
        'launchTesting'
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope"
      ALTER COLUMN "type" TYPE "public"."user_group_management_access_scope_type_enum" USING "type"::"text"::"public"."user_group_management_access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."user_group_management_access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope"
      ADD CONSTRAINT "UQ_ef6901670e104115fc7f29de55e" UNIQUE (
          "leader_user_group_id",
          "subordinate_user_group_id",
          "type"
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "UQ_ef6901670e104115fc7f29de55e"
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."user_group_management_access_scope_type_enum_old" AS ENUM('inviteUsers', 'removeUsers', 'viewUsers')
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope"
      ALTER COLUMN "type" TYPE "public"."user_group_management_access_scope_type_enum_old" USING "type"::"text"::"public"."user_group_management_access_scope_type_enum_old"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."user_group_management_access_scope_type_enum"
    `);
    await queryRunner.query(`
      ALTER TYPE "public"."user_group_management_access_scope_type_enum_old"
      RENAME TO "user_group_management_access_scope_type_enum"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope"
      ADD CONSTRAINT "UQ_ef6901670e104115fc7f29de55e" UNIQUE (
          "leader_user_group_id",
          "subordinate_user_group_id",
          "type"
        )
    `);
  }
}
