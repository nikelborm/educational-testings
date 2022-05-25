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
      filterForLaunchedTestings: { ids?: number[] };
      filterForUserGroups: { ids?: number[] };
    },
  ): Promise<EducationalSpace> {
    let qb = this.repo.createQueryBuilder('educationalSpace');
    if (filters.filterForUserGroups.ids?.length)
      qb = qb.leftJoinAndSelect(
        'educationalSpace.userGroups',
        'userGroups',
        `userGroups.id in (${filters.filterForUserGroups.ids})`,
      );
    else qb = qb.leftJoinAndSelect('educationalSpace.userGroups', 'userGroups');

    if (filters.filterForLaunchedTestings.ids?.length)
      qb = qb.leftJoinAndSelect(
        'educationalSpace.launchedTestings',
        'launchedTestings',
        `launchedTestings.id in (${filters.filterForLaunchedTestings.ids})`,
      );
    else
      qb = qb.leftJoinAndSelect(
        'educationalSpace.launchedTestings',
        'launchedTestings',
      );

    const educationalSpace = await qb
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
