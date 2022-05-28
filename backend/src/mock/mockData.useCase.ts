import { Injectable } from '@nestjs/common';
import {
  AbstractTestingUseCase,
  EducationalSpaceUseCase,
  model,
  repo,
  UserUseCase,
} from 'src/modules';
import {
  AbstractAnswerDataType,
  AbstractQuestionChoiceType,
  ClearedInsertedUserDTO,
  TestingAnalyticsModuleSupport,
} from 'src/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userToUserGroupRepo: repo.UserToUserGroupRepo,
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
    private readonly abstractTestingRepo: repo.AbstractTestingRepo,
    private readonly testingAnalyticsModuleRepo: repo.TestingAnalyticsModuleRepo,
    private readonly abstractTestingStageRepo: repo.AbstractTestingStageRepo,
    private readonly abstractQuestionRepo: repo.AbstractQuestionRepo,
    private readonly abstractAnswerOptionRepo: repo.AbstractAnswerOptionRepo,
    private readonly userRepo: repo.UserRepo,
    private readonly abstractTestingUseCase: AbstractTestingUseCase,
    private readonly tagRepo: repo.TagRepo,
    private readonly answerContributionRepo: repo.AnswerOptionIntoTagContributionRepo,
  ) {}

  // TODO: wrap into migrarion
  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');
    try {
      const [owner, student, teacher] = (await this.userUseCase.createManyUsers(
        [
          {
            email: 'owner@mail.ru',
            firstName: 'admin firstName',
            lastName: 'admin lastName',
            gender: 'woman',
            password: 'password',
            patronymic: 'admin patronymic',
            canCreateEducationalSpaces: true,
          },
          {
            email: 'student@mail.ru',
            firstName: 'student firstName',
            lastName: 'student lastName',
            gender: 'man',
            password: 'password',
            patronymic: 'student patronymic',
            canCreateEducationalSpaces: false,
          },
          {
            email: 'teacher@mail.ru',
            firstName: 'teacher firstName',
            lastName: 'teacher lastName',
            gender: 'queer',
            password: 'password',
            patronymic: 'teacher patronymic',
            canCreateEducationalSpaces: false,
          },
        ],
      )) as [
        ClearedInsertedUserDTO,
        ClearedInsertedUserDTO,
        ClearedInsertedUserDTO,
      ];

      const { studentsGroup, teachersGroup, educationalSpace } =
        await this.educationalSpaceUseCase.createEducationalSpace(
          {
            name: 'Первое образовательное пространство',
            description: 'Описание первого образовательного пространства',
          },
          owner,
        );
      await this.userToUserGroupRepo.createOnePlain({
        userId: teacher.id,
        userGroupId: teachersGroup.id,
      });

      await this.userToUserGroupRepo.createOnePlain({
        userId: student.id,
        userGroupId: studentsGroup.id,
      });

      const { studentsGroup: studentsGroup2, teachersGroup: teachersGroup2 } =
        await this.educationalSpaceUseCase.createEducationalSpace(
          {
            name: 'Второе образовательное пространство',
            description: 'Описание второго образовательного пространства',
          },
          owner,
        );

      await this.userToUserGroupRepo.createOnePlain({
        userId: student.id,
        userGroupId: studentsGroup2.id,
      });

      await this.userToUserGroupRepo.createOnePlain({
        userId: teacher.id,
        userGroupId: teachersGroup2.id,
      });

      const { privateTesting } = await this.createMockAbstractTestings(
        owner.id,
      );

      await this.abstractTestingUseCase.addTestingToEducationalSpaceCatalog(
        {
          abstractTestingId: privateTesting.id,
          educationalSpaceId: educationalSpace.id,
        },
        await this.userRepo.getOneByIdWithAccessScopes(owner.id),
      );
    } catch (error) {
      console.log('fillDBScript finished with error', error);
    }
  }

  private async createMockAbstractTestings(createdByUserId: number): Promise<{
    publicTesting: model.AbstractTesting;
    privateTesting: model.AbstractTesting;
  }> {
    const [ownerAnalyticsModule, studentAnalyticsModule] =
      (await this.testingAnalyticsModuleRepo.createManyWithRelations([
        {
          name: 'Подключаемый модуль аналитики №1',
          uuid: uuid(),
          description:
            'Подключаемый модуль аналитики, который будет отрабатывать на стороне владельца пространства №1',
          support:
            TestingAnalyticsModuleSupport.ANALYTICS_OF_ALL_ATTEMPTS_OF_LAUNCHED_TESTING,
        },
        {
          name: 'Подключаемый модуль аналитики №2',
          uuid: uuid(),
          description:
            'Подключаемый модуль аналитики, который будет отрабатывать на стороне студента №1',
          support: TestingAnalyticsModuleSupport.ANALYTICS_OF_USER_ATTEMPT,
        },
      ])) as [model.TestingAnalyticsModule, model.TestingAnalyticsModule];

    const [waterTag, fireTag, dirtTag, airTag] =
      (await this.tagRepo.createManyWithRelations([
        {
          name: 'Огонь',
          description:
            'Человек с большим количеством очков в пользу этого тега любит всё огненное',
        },
        {
          name: 'Вода',
          description:
            'Человек с большим количеством очков в пользу этого тега любит всё водяное',
        },
        {
          name: 'Земля',
          description:
            'Человек с большим количеством очков в пользу этого тега любит всё земляное',
        },
        {
          name: 'Воздух',
          description:
            'Человек с большим количеством очков в пользу этого тега любит всё воздушное',
        },
      ])) as [model.Tag, model.Tag, model.Tag, model.Tag];

    const publicTesting = await this.createMockAbstractTesting(
      createdByUserId,
      true,
      ownerAnalyticsModule,
      studentAnalyticsModule,
      waterTag,
      fireTag,
      dirtTag,
      airTag,
    );

    const privateTesting = await this.createMockAbstractTesting(
      createdByUserId,
      false,
      ownerAnalyticsModule,
      studentAnalyticsModule,
      waterTag,
      fireTag,
      dirtTag,
      airTag,
    );

    return {
      publicTesting,
      privateTesting,
    };
  }

  private async createMockAbstractTesting(
    createdByUserId: number,
    isPublic: boolean,
    ownerAnalyticsModule: model.TestingAnalyticsModule,
    studentAnalyticsModule: model.TestingAnalyticsModule,
    waterTag: model.Tag,
    fireTag: model.Tag,
    dirtTag: model.Tag,
    airTag: model.Tag,
  ): Promise<model.AbstractTesting> {
    const abstractTesting =
      await this.abstractTestingRepo.createOneWithRelations({
        name: `Тестирование на определение интересов ${Math.random()}`,
        isPublic,
        createdByUserId,
        description:
          'Большое нескучное тестирование которое поможет студентом определиться с выбором электива',
        goal: 'Донести до студента что ему нравится и владельцам пространств понять что нравится их студентам',
        testingAnalyticsModuleToAbstractTestingRelations: [
          { testingAnalyticsModuleId: ownerAnalyticsModule.id },
          { testingAnalyticsModuleId: studentAnalyticsModule.id },
        ],
        isAvailableToLaunch: true,
      });

    const [waterStage, fireStage, dirtStage, airStage] =
      (await this.abstractTestingStageRepo.createManyWithRelations([
        {
          abstractTesting,
          name: 'Этап воды',
          description: 'Этап на определение любите ли вы воду',
        },
        {
          abstractTesting,
          name: 'Этап огня',
          description: 'Этап на определение любите ли вы огонь',
        },
        {
          abstractTesting,
          name: 'Этап земли',
          description: 'Этап на определение любите ли вы землю',
        },
        {
          abstractTesting,
          name: 'Этап воздуха',
          description: 'Этап на определение любите ли вы воздух',
        },
      ])) as [
        model.AbstractTestingStage,
        model.AbstractTestingStage,
        model.AbstractTestingStage,
        model.AbstractTestingStage,
      ];

    const [
      question1,
      question2,
      question3,
      question4,
      question5,
      question6,
      question7,
      question8,
    ] = await this.abstractQuestionRepo.createManyWithRelations(
      [
        {
          abstractTestingStage: waterStage, // баллы в воду
          name: 'Ты любишь плавать?',
        },
        {
          abstractTestingStage: waterStage, // баллы в воду и воздух
          name: 'Ты любишь акваланги?',
        },
        {
          abstractTestingStage: fireStage, // баллы в воду и огонь
          name: 'Ты любишь тушить пожары?',
        },
        {
          abstractTestingStage: fireStage, // баллы в огонь
          name: 'Ты любишь поджигать людей?',
        },
        {
          abstractTestingStage: dirtStage, // баллы в воду и землю
          name: 'Ты любишь какать?',
        },
        {
          abstractTestingStage: dirtStage, // баллы в землю
          name: 'Ты любишь жрать землю?',
        },
        {
          abstractTestingStage: airStage, // баллы в огонь и воздух
          name: 'Ты любишь стрелять по голубям?',
        },
        {
          abstractTestingStage: airStage, // баллы в воздух
          name: 'Ты любишь когда тебя выбрасывают из самолёта?',
        },
      ].map((rest) => ({
        ...rest,
        isRequired: true,
        description:
          'Описание вопроса для тупых, кому настолько простой вопрос не понятен',
        answerChoiceType: AbstractQuestionChoiceType.SINGLE_CHOICE,
        dataTypeOfAnswers: AbstractAnswerDataType.STRING,
      })),
    );

    const [
      yesAnswer1,
      yesAnswer2,
      yesAnswer3,
      yesAnswer4,
      yesAnswer5,
      yesAnswer6,
      yesAnswer7,
      yesAnswer8,
    ] = (
      await this.abstractAnswerOptionRepo.createManyWithRelations([
        { abstractQuestion: question1, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question1, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question2, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question2, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question3, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question3, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question4, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question4, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question5, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question5, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question6, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question6, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question7, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question7, isFreeField: false, answer: 'Нет' },
        { abstractQuestion: question8, isFreeField: false, answer: 'Да' },
        { abstractQuestion: question8, isFreeField: false, answer: 'Нет' },
      ])
    ).filter((_, i) => i % 2 == 0);

    await this.answerContributionRepo.createManyWithRelations([
      { weight: 0.5, abstractAnswerOption: yesAnswer1, tag: waterTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer2, tag: waterTag },
      { weight: 0.5, abstractAnswerOption: yesAnswer2, tag: airTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer3, tag: waterTag },
      { weight: 0.5, abstractAnswerOption: yesAnswer3, tag: fireTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer4, tag: fireTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer5, tag: waterTag },
      { weight: 0.5, abstractAnswerOption: yesAnswer5, tag: dirtTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer6, tag: dirtTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer7, tag: fireTag },
      { weight: 0.5, abstractAnswerOption: yesAnswer7, tag: airTag },

      { weight: 0.5, abstractAnswerOption: yesAnswer8, tag: airTag },
    ]);

    return abstractTesting as model.AbstractTesting;
  }
}
