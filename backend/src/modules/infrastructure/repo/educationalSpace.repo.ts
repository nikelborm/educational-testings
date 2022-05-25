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
      filterForLaunchedTestings: { ids?: number[] };
      filterForUserGroups: { ids?: number[] };
    },
  ): Promise<EducationalSpaceFromDBDTO> {
    const educationalSpace = await this.repo
      .createQueryBuilder('educationalSpace')
      .leftJoin(
        'educationalSpace.userGroups',
        'userGroups',
        filters.filterForUserGroups.ids?.length
          ? `userGroups.id in (${filters.filterForUserGroups.ids})`
          : undefined,
      )
      .leftJoin(
        'educationalSpace.launchedTestings',
        'launchedTestings',
        filters.filterForLaunchedTestings.ids?.length
          ? `launchedTestings.id in (${filters.filterForLaunchedTestings.ids})`
          : undefined,
      )
      .select([
        'educationalSpace.id',
        'educationalSpace.name',
        'educationalSpace.description',
        'userGroups.id',
        'userGroups.name',
        'userGroups.description',
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
