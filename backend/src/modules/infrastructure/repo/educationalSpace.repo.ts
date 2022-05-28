import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  CreatedEntity,
  createManyWithRelations,
  createOneWithRelations,
  NewEntity,
  UpdateEntity,
  updateOneWithRelations,
} from 'src/tools';
import { EducationalSpaceFromDBDTO } from 'src/types';
import { Repository } from 'typeorm';
import { EducationalSpace } from '../model';

@Injectable()
export class EducationalSpaceRepo {
  constructor(
    @InjectRepository(EducationalSpace)
    private readonly repo: Repository<EducationalSpace>,
  ) {}

  async getOneById(
    id: number,
    filters: {
      filterForLaunchedTestingIds: number[] | 'all';
      filterForUserGroupIds: number[] | 'all';
    },
  ): Promise<EducationalSpaceFromDBDTO> {
    const educationalSpace = await this.repo
      .createQueryBuilder('educationalSpace')
      .leftJoin(
        'educationalSpace.userGroups',
        'userGroups',
        filters.filterForUserGroupIds === 'all'
          ? undefined
          : filters.filterForUserGroupIds.length
          ? `userGroups.id in (${filters.filterForUserGroupIds})`
          : 'FALSE',
      )
      .leftJoin(
        'educationalSpace.launchedTestings',
        'launchedTestings',
        filters.filterForLaunchedTestingIds === 'all'
          ? undefined
          : filters.filterForLaunchedTestingIds.length
          ? `launchedTestings.id in (${filters.filterForLaunchedTestingIds})`
          : 'FALSE',
      )
      .leftJoin('launchedTestings.abstractTesting', 'abstractTesting')
      .select([
        'educationalSpace.id',
        'educationalSpace.name',
        'educationalSpace.description',
        'userGroups.id',
        'userGroups.name',
        'userGroups.description',
        'launchedTestings.id',
        'launchedTestings.openingDate',
        'launchedTestings.closingDate',
        'launchedTestings.maximumAttemptDurationInMinutes',
        'abstractTesting.id',
        'abstractTesting.name',
        'abstractTesting.description',
        'abstractTesting.goal',
      ])
      .where('educationalSpace.id = :educationalSpaceId', {
        educationalSpaceId: id,
      })
      .getOne();

    if (!educationalSpace)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'educationalSpace'),
      );
    return educationalSpace;
  }

  async updateOneWithRelations(
    updatedEducationalSpace: UpdateEntity<EducationalSpace, 'id'>,
  ): Promise<EducationalSpace> {
    return await updateOneWithRelations<EducationalSpace, 'id'>(
      this.repo,
      updatedEducationalSpace,
    );
  }

  async createOneWithRelations(
    newEducationalSpace: NewEntity<EducationalSpace, 'id'>,
  ): Promise<CreatedEntity<EducationalSpace, 'id'>> {
    return await createOneWithRelations(this.repo, newEducationalSpace);
  }

  async createManyWithRelations(
    newEducationalSpaces: NewEntity<EducationalSpace, 'id'>[],
  ): Promise<CreatedEntity<EducationalSpace, 'id'>[]> {
    return await createManyWithRelations(this.repo, newEducationalSpaces);
  }

  async deleteMany(educationalSpaceIds: number[]): Promise<void> {
    await this.repo.delete(educationalSpaceIds);
  }
}
