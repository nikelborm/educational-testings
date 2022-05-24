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

  async getOneById(id: number): Promise<EducationalSpace> {
    const educationalSpace = await this.repo.findOne({ where: { id } });
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
