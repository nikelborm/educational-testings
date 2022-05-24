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
import { EducationalSpaceAccessScope } from '../model';

@Injectable()
export class EducationalSpaceAccessScopeRepo {
  constructor(
    @InjectRepository(EducationalSpaceAccessScope)
    private readonly repo: Repository<EducationalSpaceAccessScope>,
  ) {}

  async getOneById(id: number): Promise<EducationalSpaceAccessScope> {
    const educationalSpaceAccessScope = await this.repo.findOne({
      where: { id },
    });
    if (!educationalSpaceAccessScope)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(
          id,
          'educationalSpaceAccessScope',
        ),
      );
    return educationalSpaceAccessScope;
  }

  async updateOneWithRelations(
    updatedEducationalSpaceAccessScope: UpdateEntity<
      EducationalSpaceAccessScope,
      'id'
    >,
  ): Promise<EducationalSpaceAccessScope> {
    return await updateOneWithRelations<EducationalSpaceAccessScope, 'id'>(
      this.repo,
      updatedEducationalSpaceAccessScope,
    );
  }

  async createOneWithRelations(
    newEducationalSpaceAccessScope: NewEntity<
      EducationalSpaceAccessScope,
      'id'
    >,
  ): Promise<CreatedEntity<EducationalSpaceAccessScope, 'id'>> {
    return await createOneWithRelations(
      this.repo,
      newEducationalSpaceAccessScope,
    );
  }

  async createManyWithRelations(
    newEducationalSpaceAccessScopes: NewEntity<
      EducationalSpaceAccessScope,
      'id'
    >[],
  ): Promise<CreatedEntity<EducationalSpaceAccessScope, 'id'>[]> {
    return await createManyWithRelations(
      this.repo,
      newEducationalSpaceAccessScopes,
    );
  }

  async deleteMany(educationalSpaceAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(educationalSpaceAccessScopeIds);
  }
}
