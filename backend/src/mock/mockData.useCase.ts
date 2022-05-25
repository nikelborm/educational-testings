import { Injectable } from '@nestjs/common';
import { EducationalSpaceUseCase, repo, UserUseCase } from 'src/modules';
import { ClearedInsertedUserDTO } from 'src/types';

@Injectable()
export class MockDataUseCase {
  constructor(
    private readonly userUseCase: UserUseCase,
    private readonly userToUserGroupRepo: repo.UserToUserGroupRepo,
    private readonly educationalSpaceUseCase: EducationalSpaceUseCase,
  ) {}

  // TODO: wrap into migrarion
  async fillDBScript(): Promise<void> {
    console.log('fillDBScript called');
    try {
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

      const { studentsGroup } =
        await this.educationalSpaceUseCase.createEducationalSpace(
          {
            name: 'Первое образовательное пространство',
            description: 'Описание первого образовательного пространства',
          },
          owner,
        );

      await this.userToUserGroupRepo.createOnePlain({
        userId: student.id,
        userGroupId: studentsGroup.id,
      });

      const { studentsGroup: secondSpaceUserGroup } =
        await this.educationalSpaceUseCase.createEducationalSpace(
          {
            name: 'Второе образовательное пространство',
            description: 'Описание второго образовательного пространства',
          },
          owner,
        );

      await this.userToUserGroupRepo.createOnePlain({
        userId: student.id,
        userGroupId: secondSpaceUserGroup.id,
      });
    } catch (error) {
      console.log('fillDBScript finished with error', error);
    }
  }
}
