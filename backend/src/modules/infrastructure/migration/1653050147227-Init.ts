import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1653050147227 implements MigrationInterface {
    name = 'Init1653050147227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."educational_space_access_scope_type_enum" AS ENUM(
                'addOwnAbstractTestingsIntoEducationalSpaceCatalog',
                'viewLaunchedTestings',
                'modifyLaunchedTestings',
                'modifyUserGroups',
                'viewUserGroups',
                'editGroupInfo'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "educational_space_access_scope" (
                "educational_space_access_scope_id" SERIAL NOT NULL,
                "user_group_id" integer NOT NULL,
                "type" "public"."educational_space_access_scope_type_enum" NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_b6e45f71cbacde485b223dac35f" UNIQUE ("user_group_id", "type"),
                CONSTRAINT "PK_7832f0760a010603e1c43e3ea88" PRIMARY KEY ("educational_space_access_scope_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "educational_space" (
                "educational_space_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "created_by_user_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e8312745ede7f9d8eeceb716f62" PRIMARY KEY ("educational_space_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "launched_testing" (
                "launched_testing_id" SERIAL NOT NULL,
                "abstract_testing_id" integer NOT NULL,
                "educational_space_id" integer NOT NULL,
                "launched_by_user_id" integer NOT NULL,
                "opening_date" TIMESTAMP WITH TIME ZONE,
                "closing_date" TIMESTAMP WITH TIME ZONE,
                "maximum_attempt_duration_in_minutes" integer,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5368257ab7c46979caacdc03a51" PRIMARY KEY ("launched_testing_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "patronymic" character varying NOT NULL,
                "gender" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying(15),
                "salt" character varying NOT NULL,
                "password_hash" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."launched_testing_access_scope_type_enum" AS ENUM(
                'viewAnalytics',
                'viewUsersFinishedTesting',
                'makeTestingAttempts'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "launched_testing_access_scope" (
                "launched_testing_access_scope_id" SERIAL NOT NULL,
                "user_group_id" integer NOT NULL,
                "launched_testing_id" integer NOT NULL,
                "type" "public"."launched_testing_access_scope_type_enum" NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_776520980e8c17feeecf7a4619e" UNIQUE ("user_group_id", "launched_testing_id", "type"),
                CONSTRAINT "PK_4fc14019414b37e0b7285d77388" PRIMARY KEY ("launched_testing_access_scope_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_group" (
                "user_group_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "educational_space_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a2ab1a9327f7690227a298a4025" PRIMARY KEY ("user_group_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_to_user_group" (
                "user_id" integer NOT NULL,
                "user_group_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_344fa928c1069c2c344153dcad8" PRIMARY KEY ("user_id", "user_group_id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_group_management_access_scope_type_enum" AS ENUM('inviteUsers', 'removeUsers', 'viewUsers')
        `);
        await queryRunner.query(`
            CREATE TABLE "user_group_management_access_scope" (
                "user_group_management_access_scope_id" SERIAL NOT NULL,
                "leader_user_group_id" integer NOT NULL,
                "subordinate_user_group_id" integer NOT NULL,
                "type" "public"."user_group_management_access_scope_type_enum" NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_ef6901670e104115fc7f29de55e" UNIQUE (
                    "leader_user_group_id",
                    "subordinate_user_group_id",
                    "type"
                ),
                CONSTRAINT "PK_47449e31d00373c646a67e52a45" PRIMARY KEY ("user_group_management_access_scope_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "available_for_launch_testing" (
                "abstract_testing_id" integer NOT NULL,
                "educational_space_id" integer NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_54a12fbdc9989bd921c8cbb4372" PRIMARY KEY ("abstract_testing_id", "educational_space_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "abstract_testing" (
                "abstract_testing_id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "description" character varying,
                "goal" character varying NOT NULL,
                "created_by_user_id" integer NOT NULL,
                "is_available_to_launch" boolean NOT NULL DEFAULT false,
                "is_public" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_53eaf0a1c313928c4aff64ad128" PRIMARY KEY ("abstract_testing_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f7d26e320ec68f35ccf8ce14be" ON "available_for_launch_testing" ("educational_space_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_3d00e8bc90bc12c19a824ade7b" ON "available_for_launch_testing" ("abstract_testing_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d098101d79ac837699e672e49c" ON "user_to_user_group" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_615ade395cf81643da4487703c" ON "user_to_user_group" ("user_group_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "educational_space_access_scope"
            ADD CONSTRAINT "FK_578ea398508aadf9cdb1177f0d7" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "educational_space"
            ADD CONSTRAINT "FK_d1cfd1b214fdf7a7676e191b21b" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing"
            ADD CONSTRAINT "FK_2ab0ca6343d1dcb5b05ab644491" FOREIGN KEY ("abstract_testing_id") REFERENCES "abstract_testing"("abstract_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing"
            ADD CONSTRAINT "FK_558974a38ba516fbe7aa09fab7a" FOREIGN KEY ("educational_space_id") REFERENCES "educational_space"("educational_space_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing"
            ADD CONSTRAINT "FK_36055941472d2e58c96a9f3468f" FOREIGN KEY ("launched_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing_access_scope"
            ADD CONSTRAINT "FK_52bf3e32e8ddd40d38ad56fa371" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing_access_scope"
            ADD CONSTRAINT "FK_50065349a5bc2f181a5bbdf77e9" FOREIGN KEY ("launched_testing_id") REFERENCES "launched_testing"("launched_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group"
            ADD CONSTRAINT "FK_3f581159e14c5fbc80cea46b80f" FOREIGN KEY ("educational_space_id") REFERENCES "educational_space"("educational_space_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group"
            ADD CONSTRAINT "FK_d098101d79ac837699e672e49cd" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group"
            ADD CONSTRAINT "FK_615ade395cf81643da4487703ce" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group_management_access_scope"
            ADD CONSTRAINT "FK_bf420a1837ac038c746559630b9" FOREIGN KEY ("leader_user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group_management_access_scope"
            ADD CONSTRAINT "FK_0b983df6346aba099b2cec0bcf3" FOREIGN KEY ("subordinate_user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing"
            ADD CONSTRAINT "FK_3d00e8bc90bc12c19a824ade7b8" FOREIGN KEY ("abstract_testing_id") REFERENCES "abstract_testing"("abstract_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing"
            ADD CONSTRAINT "FK_f7d26e320ec68f35ccf8ce14be8" FOREIGN KEY ("educational_space_id") REFERENCES "educational_space"("educational_space_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "abstract_testing"
            ADD CONSTRAINT "FK_4a1c20db3e9f2d6fa71279cd834" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "abstract_testing" DROP CONSTRAINT "FK_4a1c20db3e9f2d6fa71279cd834"
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing" DROP CONSTRAINT "FK_f7d26e320ec68f35ccf8ce14be8"
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing" DROP CONSTRAINT "FK_3d00e8bc90bc12c19a824ade7b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "FK_0b983df6346aba099b2cec0bcf3"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "FK_bf420a1837ac038c746559630b9"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group" DROP CONSTRAINT "FK_615ade395cf81643da4487703ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group" DROP CONSTRAINT "FK_d098101d79ac837699e672e49cd"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_group" DROP CONSTRAINT "FK_3f581159e14c5fbc80cea46b80f"
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing_access_scope" DROP CONSTRAINT "FK_50065349a5bc2f181a5bbdf77e9"
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing_access_scope" DROP CONSTRAINT "FK_52bf3e32e8ddd40d38ad56fa371"
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing" DROP CONSTRAINT "FK_36055941472d2e58c96a9f3468f"
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing" DROP CONSTRAINT "FK_558974a38ba516fbe7aa09fab7a"
        `);
        await queryRunner.query(`
            ALTER TABLE "launched_testing" DROP CONSTRAINT "FK_2ab0ca6343d1dcb5b05ab644491"
        `);
        await queryRunner.query(`
            ALTER TABLE "educational_space" DROP CONSTRAINT "FK_d1cfd1b214fdf7a7676e191b21b"
        `);
        await queryRunner.query(`
            ALTER TABLE "educational_space_access_scope" DROP CONSTRAINT "FK_578ea398508aadf9cdb1177f0d7"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_615ade395cf81643da4487703c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d098101d79ac837699e672e49c"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_3d00e8bc90bc12c19a824ade7b"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f7d26e320ec68f35ccf8ce14be"
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_to_user_group"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "available_for_launch_testing"
            ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            DROP TABLE "abstract_testing"
        `);
        await queryRunner.query(`
            DROP TABLE "available_for_launch_testing"
        `);
        await queryRunner.query(`
            DROP TABLE "user_group_management_access_scope"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_group_management_access_scope_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user_to_user_group"
        `);
        await queryRunner.query(`
            DROP TABLE "user_group"
        `);
        await queryRunner.query(`
            DROP TABLE "launched_testing_access_scope"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."launched_testing_access_scope_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "launched_testing"
        `);
        await queryRunner.query(`
            DROP TABLE "educational_space"
        `);
        await queryRunner.query(`
            DROP TABLE "educational_space_access_scope"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."educational_space_access_scope_type_enum"
        `);
    }

}
