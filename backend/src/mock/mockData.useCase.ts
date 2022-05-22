import { Injectable } from '@nestjs/common';
import { EducationalSpaceUseCase, UserUseCase } from 'src/modules';
import { ClearedInsertedUserDTO } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase, // @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
  ) {}

  async fillDBScript(): Promise<void> {
    //   return await this.entityManager.transaction(async (transactionManager) => {
    //     return await this.fillDBScriptInternal(transactionManager);
    //   });
    // }
    // private async fillDBScriptInternal(
    //   transactionManager: EntityManager,
    // ): Promise<void> {
    console.log('fillDBScript called');
    const [owner, student] = (await this.userUseCase.createManyUsers([
      {
        email: 'owner@mail.ru',
        firstName: 'admin firstName',
        lastName: 'admin lastName',
        gender: 'woman',
        password: 'password',
        patronymic: 'admin patronymic',
        canCreateEducationalSpaces: true,
        userGroups: [],
      },
      {
        email: 'student@mail.ru',
        firstName: 'student firstName',
        lastName: 'student lastName',
        gender: 'man',
        password: 'password',
        patronymic: 'student patronymic',
        canCreateEducationalSpaces: false,
        userGroups: [],
      },
    ])) as [ClearedInsertedUserDTO, ClearedInsertedUserDTO];

    await this.educationalSpaceUseCase.createEducationalSpace(
      {
        name: 'Первое образовательное пространство',
        description: 'Описание первого образовательного пространства',
      },
      owner,
    );
  }
}
