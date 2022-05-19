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
export class AccessScopeRepo {
  constructor(
    @InjectRepository(EducationalSpaceAccessScope)
    private readonly repo: Repository<EducationalSpaceAccessScope>,
  ) {}

  async getOneById(id: number): Promise<EducationalSpaceAccessScope> {
    const accessScope = await this.repo.findOne({ where: { id } });
    if (!accessScope)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'accessScope'),
      );
    return accessScope;
  }

  async updateOneWithRelations(
    updatedAccessScope: UpdatedEntity<EducationalSpaceAccessScope>,
  ): Promise<EducationalSpaceAccessScope> {
    return await updateOneWithRelations(
      this.repo,
      updatedAccessScope,
      'accessScope',
    );
  }

  async createOneWithRelations(
    newAccessScope: NewEntity<EducationalSpaceAccessScope>,
  ): Promise<EducationalSpaceAccessScope> {
    return await createOneWithRelations(
      this.repo,
      newAccessScope,
      'accessScope',
    );
  }

  async deleteMany(accessScopeIds: number[]): Promise<void> {
    await this.repo.delete(accessScopeIds);
  }
}
