import { Injectable } from '@nestjs/common';
import { EducationalSpaceUseCase, UserUseCase } from 'src/modules';
import { ClearedInsertedUserDTO } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
  ) {}

  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [owner, student] = (await this.userUseCase.createManyUsers([
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
    ])) as [ClearedInsertedUserDTO, ClearedInsertedUserDTO];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { studentsGroup } =
      await this.educationalSpaceUseCase.createEducationalSpace(
        {
          name: 'Первое образовательное пространство',
          description: 'Описание первого образовательного пространства',
        },
        owner,
      );
    // this.userToUserGroupRepo.
  }
}
