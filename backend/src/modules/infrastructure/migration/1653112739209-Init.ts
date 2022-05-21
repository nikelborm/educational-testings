import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1653112739209 implements MigrationInterface {
  name = 'Init1653112739209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "public"."abstract_question_answer_choice_type_enum" AS ENUM(
        'multipleChoices',
        'multipleChoicesWithFreeField',
        'singleChoice',
        'singleChoiceWithFreeField',
        'freeField'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."abstract_question_data_type_of_answers_enum" AS ENUM('string', 'number', 'date')
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_question" (
        "abstract_question_id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying,
        "is_required" boolean NOT NULL,
        "order" SERIAL NOT NULL,
        "abstract_testing_stage_id" integer NOT NULL,
        "answer_choice_type" "public"."abstract_question_answer_choice_type_enum" NOT NULL,
        "data_type_of_answers" "public"."abstract_question_data_type_of_answers_enum" NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_ccfca5d88020ac6a8568d5e7b1f" UNIQUE ("order"),
        CONSTRAINT "PK_df774719797233a15e785fe5687" PRIMARY KEY ("abstract_question_id")
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
      CREATE TABLE "abstract_testing_stage" (
        "abstract_testing_stage_id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying,
        "abstract_testing_id" integer NOT NULL,
        "order" SERIAL NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_c6ccfd57016efb75696e90d5bd1" UNIQUE ("order"),
        CONSTRAINT "PK_f7178e2ad560d66f7ed0d095f6e" PRIMARY KEY ("abstract_testing_stage_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "answer_option_instance" (
        "answer_option_instance_id" SERIAL NOT NULL,
        "abstract_answer_option_id" integer NOT NULL,
        "launched_testing_id" integer NOT NULL,
        CONSTRAINT "UQ_de281f7baf63e49ffd18a8507ac" UNIQUE (
          "abstract_answer_option_id",
          "launched_testing_id"
        ),
        CONSTRAINT "PK_53b0c5aaef2ddbc8fb920bbf296" PRIMARY KEY ("answer_option_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "answer_option_into_tag_contribution" (
        "answer_option_into_tag_contribution_id" SERIAL NOT NULL,
        "abstract_answer_option_id" integer NOT NULL,
        "tag_id" integer NOT NULL,
        "weight" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_5db5be60ebd5bcf3bbeaba96280" PRIMARY KEY ("answer_option_into_tag_contribution_id")
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
      CREATE UNIQUE INDEX "IDX_54a12fbdc9989bd921c8cbb437" ON "available_for_launch_testing" ("abstract_testing_id", "educational_space_id")
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
      CREATE TABLE "question_instance" (
        "question_instance_id" SERIAL NOT NULL,
        "abstract_question_id" integer NOT NULL,
        "launched_testing_id" integer NOT NULL,
        CONSTRAINT "UQ_3151bf7351c4b87b173440d2bbd" UNIQUE ("abstract_question_id", "launched_testing_id"),
        CONSTRAINT "PK_7a4f3545d8bf284407c951c1e29" PRIMARY KEY ("question_instance_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "tag" (
        "tag_id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "description" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"),
        CONSTRAINT "PK_e9fe36a7c01af44f6c47f972f0b" PRIMARY KEY ("tag_id")
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."testing_analytics_module_support_enum" AS ENUM(
        'analyticsOfUserAttempt',
        'analyticsOfAllAttemptsOfLaunchedTesting'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "testing_analytics_module" (
        "testing_analytics_module_id" SERIAL NOT NULL,
        "testing_analytics_module_uuid" uuid NOT NULL,
        "name" character varying NOT NULL,
        "support" "public"."testing_analytics_module_support_enum" NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_6438e8515faf4a462b77fabe79b" UNIQUE ("testing_analytics_module_uuid"),
        CONSTRAINT "PK_719df83a59a91b44c27cda0a356" PRIMARY KEY ("testing_analytics_module_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "testing_analytics_module_to_abstract_testing" (
        "testing_analytics_module_id" integer NOT NULL,
        "abstract_testing_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_6050f3b34ffdf2588b10a36a444" PRIMARY KEY (
          "testing_analytics_module_id",
          "abstract_testing_id"
        )
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_6050f3b34ffdf2588b10a36a44" ON "testing_analytics_module_to_abstract_testing" (
        "testing_analytics_module_id",
        "abstract_testing_id"
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."testing_attempt_status_enum" AS ENUM('draft', 'finishedAttempt')
    `);
    await queryRunner.query(`
      CREATE TABLE "testing_attempt" (
        "testing_attempt_id" SERIAL NOT NULL,
        "launched_testing_id" integer NOT NULL,
        "user_id" integer NOT NULL,
        "finished_at_date" TIMESTAMP WITH TIME ZONE,
        "last_saved_at_date" TIMESTAMP WITH TIME ZONE,
        "status" "public"."testing_attempt_status_enum" NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_c0945af8bdffa8478cae1a22720" PRIMARY KEY ("testing_attempt_id")
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
      CREATE TABLE "user_given_answer" (
        "user_given_answer_id" SERIAL NOT NULL,
        "answer_option_instance_id" integer NOT NULL,
        "testing_attempt_id" integer NOT NULL,
        "free_field_answer" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_d9099c5b4b732faab17e7bb7c96" UNIQUE (
          "answer_option_instance_id",
          "testing_attempt_id"
        ),
        CONSTRAINT "PK_62d334130b0579e543af0b1af4f" PRIMARY KEY ("user_given_answer_id")
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
      CREATE TABLE "user_to_user_group" (
        "user_id" integer NOT NULL,
        "user_group_id" integer NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_344fa928c1069c2c344153dcad8" PRIMARY KEY ("user_id", "user_group_id")
      )
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_344fa928c1069c2c344153dcad" ON "user_to_user_group" ("user_id", "user_group_id")
    `);
    await queryRunner.query(`
      CREATE TABLE "abstract_answer_option" (
        "abstract_answer_option_id" SERIAL NOT NULL,
        "abstract_question_id" integer NOT NULL,
        "is_free_field" boolean NOT NULL,
        "answer" character varying,
        "description" character varying,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_1ada2d7b5c93b1fcf4d89269c51" PRIMARY KEY ("abstract_answer_option_id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing" DROP COLUMN "created_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "available_for_launch_testing" DROP COLUMN "created_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group" DROP COLUMN "created_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "available_for_launch_testing"
      ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing"
      ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group"
      ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_84670dfb307676d934812be530" ON "testing_analytics_module_to_abstract_testing" ("abstract_testing_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_a6a040a7ca6f40f9bc41a971ec" ON "testing_analytics_module_to_abstract_testing" ("testing_analytics_module_id")
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
      ALTER TABLE "abstract_question"
      ADD CONSTRAINT "FK_919f5c07832b83d6641d7ce6dac" FOREIGN KEY ("abstract_testing_stage_id") REFERENCES "abstract_testing_stage"("abstract_testing_stage_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_testing"
      ADD CONSTRAINT "FK_4a1c20db3e9f2d6fa71279cd834" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_testing_stage"
      ADD CONSTRAINT "FK_537756b07df5bbf97e1302870db" FOREIGN KEY ("abstract_testing_id") REFERENCES "abstract_testing"("abstract_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_instance"
      ADD CONSTRAINT "FK_be716fae1c7d7d71b054fbd0ba0" FOREIGN KEY ("abstract_answer_option_id") REFERENCES "abstract_answer_option"("abstract_answer_option_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_instance"
      ADD CONSTRAINT "FK_5c002c71a5877843ffc65e4470a" FOREIGN KEY ("launched_testing_id") REFERENCES "launched_testing"("launched_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution"
      ADD CONSTRAINT "FK_23c1b600210f65dd07245be08ed" FOREIGN KEY ("abstract_answer_option_id") REFERENCES "abstract_answer_option"("abstract_answer_option_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution"
      ADD CONSTRAINT "FK_b1fc3cd630732a7bddf698d32bb" FOREIGN KEY ("tag_id") REFERENCES "tag"("tag_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
      ALTER TABLE "educational_space"
      ADD CONSTRAINT "FK_d1cfd1b214fdf7a7676e191b21b" FOREIGN KEY ("created_by_user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "educational_space_access_scope"
      ADD CONSTRAINT "FK_578ea398508aadf9cdb1177f0d7" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
      ALTER TABLE "question_instance"
      ADD CONSTRAINT "FK_1ddcb17d316e64c2550a574f5f7" FOREIGN KEY ("abstract_question_id") REFERENCES "abstract_question"("abstract_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "question_instance"
      ADD CONSTRAINT "FK_8f446e9328078a083bd7b74e6fe" FOREIGN KEY ("launched_testing_id") REFERENCES "launched_testing"("launched_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing"
      ADD CONSTRAINT "FK_a6a040a7ca6f40f9bc41a971eca" FOREIGN KEY ("testing_analytics_module_id") REFERENCES "testing_analytics_module"("testing_analytics_module_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing"
      ADD CONSTRAINT "FK_84670dfb307676d934812be530d" FOREIGN KEY ("abstract_testing_id") REFERENCES "abstract_testing"("abstract_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_attempt"
      ADD CONSTRAINT "FK_259c2e1b2d0a91dddaa8e58aa1f" FOREIGN KEY ("launched_testing_id") REFERENCES "launched_testing"("launched_testing_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_attempt"
      ADD CONSTRAINT "FK_3d8ad66700e1dddf72a3c117ec4" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_given_answer"
      ADD CONSTRAINT "FK_261d59f6e7dbea989e9e5446810" FOREIGN KEY ("answer_option_instance_id") REFERENCES "answer_option_instance"("answer_option_instance_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_given_answer"
      ADD CONSTRAINT "FK_c93ad4d5abad054b19f117c4a33" FOREIGN KEY ("testing_attempt_id") REFERENCES "testing_attempt"("testing_attempt_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group"
      ADD CONSTRAINT "FK_3f581159e14c5fbc80cea46b80f" FOREIGN KEY ("educational_space_id") REFERENCES "educational_space"("educational_space_id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
      ALTER TABLE "user_to_user_group"
      ADD CONSTRAINT "FK_d098101d79ac837699e672e49cd" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group"
      ADD CONSTRAINT "FK_615ade395cf81643da4487703ce" FOREIGN KEY ("user_group_id") REFERENCES "user_group"("user_group_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_answer_option"
      ADD CONSTRAINT "FK_37f85283f26d51e2d8f56276169" FOREIGN KEY ("abstract_question_id") REFERENCES "abstract_question"("abstract_question_id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "abstract_answer_option" DROP CONSTRAINT "FK_37f85283f26d51e2d8f56276169"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group" DROP CONSTRAINT "FK_615ade395cf81643da4487703ce"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group" DROP CONSTRAINT "FK_d098101d79ac837699e672e49cd"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "FK_0b983df6346aba099b2cec0bcf3"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group_management_access_scope" DROP CONSTRAINT "FK_bf420a1837ac038c746559630b9"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_group" DROP CONSTRAINT "FK_3f581159e14c5fbc80cea46b80f"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_given_answer" DROP CONSTRAINT "FK_c93ad4d5abad054b19f117c4a33"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_given_answer" DROP CONSTRAINT "FK_261d59f6e7dbea989e9e5446810"
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_attempt" DROP CONSTRAINT "FK_3d8ad66700e1dddf72a3c117ec4"
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_attempt" DROP CONSTRAINT "FK_259c2e1b2d0a91dddaa8e58aa1f"
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing" DROP CONSTRAINT "FK_84670dfb307676d934812be530d"
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing" DROP CONSTRAINT "FK_a6a040a7ca6f40f9bc41a971eca"
    `);
    await queryRunner.query(`
      ALTER TABLE "question_instance" DROP CONSTRAINT "FK_8f446e9328078a083bd7b74e6fe"
    `);
    await queryRunner.query(`
      ALTER TABLE "question_instance" DROP CONSTRAINT "FK_1ddcb17d316e64c2550a574f5f7"
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
      ALTER TABLE "educational_space_access_scope" DROP CONSTRAINT "FK_578ea398508aadf9cdb1177f0d7"
    `);
    await queryRunner.query(`
      ALTER TABLE "educational_space" DROP CONSTRAINT "FK_d1cfd1b214fdf7a7676e191b21b"
    `);
    await queryRunner.query(`
      ALTER TABLE "available_for_launch_testing" DROP CONSTRAINT "FK_f7d26e320ec68f35ccf8ce14be8"
    `);
    await queryRunner.query(`
      ALTER TABLE "available_for_launch_testing" DROP CONSTRAINT "FK_3d00e8bc90bc12c19a824ade7b8"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution" DROP CONSTRAINT "FK_b1fc3cd630732a7bddf698d32bb"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_into_tag_contribution" DROP CONSTRAINT "FK_23c1b600210f65dd07245be08ed"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_instance" DROP CONSTRAINT "FK_5c002c71a5877843ffc65e4470a"
    `);
    await queryRunner.query(`
      ALTER TABLE "answer_option_instance" DROP CONSTRAINT "FK_be716fae1c7d7d71b054fbd0ba0"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_testing_stage" DROP CONSTRAINT "FK_537756b07df5bbf97e1302870db"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_testing" DROP CONSTRAINT "FK_4a1c20db3e9f2d6fa71279cd834"
    `);
    await queryRunner.query(`
      ALTER TABLE "abstract_question" DROP CONSTRAINT "FK_919f5c07832b83d6641d7ce6dac"
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
      DROP INDEX "public"."IDX_a6a040a7ca6f40f9bc41a971ec"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_84670dfb307676d934812be530"
    `);
    await queryRunner.query(`
      ALTER TABLE "user_to_user_group" DROP COLUMN "created_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "testing_analytics_module_to_abstract_testing" DROP COLUMN "created_at"
    `);
    await queryRunner.query(`
      ALTER TABLE "available_for_launch_testing" DROP COLUMN "created_at"
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
      ALTER TABLE "testing_analytics_module_to_abstract_testing"
      ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_answer_option"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_344fa928c1069c2c344153dcad"
    `);
    await queryRunner.query(`
      DROP TABLE "user_to_user_group"
    `);
    await queryRunner.query(`
      DROP TABLE "user_group_management_access_scope"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."user_group_management_access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "user_group"
    `);
    await queryRunner.query(`
      DROP TABLE "user_given_answer"
    `);
    await queryRunner.query(`
      DROP TABLE "user"
    `);
    await queryRunner.query(`
      DROP TABLE "testing_attempt"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."testing_attempt_status_enum"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_6050f3b34ffdf2588b10a36a44"
    `);
    await queryRunner.query(`
      DROP TABLE "testing_analytics_module_to_abstract_testing"
    `);
    await queryRunner.query(`
      DROP TABLE "testing_analytics_module"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."testing_analytics_module_support_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "tag"
    `);
    await queryRunner.query(`
      DROP TABLE "question_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "launched_testing_access_scope"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."launched_testing_access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "launched_testing"
    `);
    await queryRunner.query(`
      DROP TABLE "educational_space_access_scope"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."educational_space_access_scope_type_enum"
    `);
    await queryRunner.query(`
      DROP TABLE "educational_space"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_54a12fbdc9989bd921c8cbb437"
    `);
    await queryRunner.query(`
      DROP TABLE "available_for_launch_testing"
    `);
    await queryRunner.query(`
      DROP TABLE "answer_option_into_tag_contribution"
    `);
    await queryRunner.query(`
      DROP TABLE "answer_option_instance"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_testing_stage"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_testing"
    `);
    await queryRunner.query(`
      DROP TABLE "abstract_question"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."abstract_question_data_type_of_answers_enum"
    `);
    await queryRunner.query(`
      DROP TYPE "public"."abstract_question_answer_choice_type_enum"
    `);
  }
}
