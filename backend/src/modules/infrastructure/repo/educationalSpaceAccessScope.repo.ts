import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import {
  createOneWithRelations,
  NewEntity,
  UpdatedEntity,
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
    updatedEducationalSpaceAccessScope: UpdatedEntity<EducationalSpaceAccessScope>,
  ): Promise<EducationalSpaceAccessScope> {
    return await updateOneWithRelations(
      this.repo,
      updatedEducationalSpaceAccessScope,
      'educationalSpaceAccessScope',
    );
  }

  async createOneWithRelations(
    newEducationalSpaceAccessScope: NewEntity<EducationalSpaceAccessScope>,
  ): Promise<EducationalSpaceAccessScope> {
    return await createOneWithRelations(
      this.repo,
      newEducationalSpaceAccessScope,
      'educationalSpaceAccessScope',
    );
  }

  async deleteMany(educationalSpaceAccessScopeIds: number[]): Promise<void> {
    await this.repo.delete(educationalSpaceAccessScopeIds);
  }
}
