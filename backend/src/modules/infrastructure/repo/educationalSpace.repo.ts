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
    updatedEducationalSpace: UpdatedEntity<EducationalSpace>,
  ): Promise<EducationalSpace> {
    return await updateOneWithRelations(
      this.repo,
      updatedEducationalSpace,
      'educationalSpace',
    );
  }

  async createOneWithRelations(
    newEducationalSpace: NewEntity<EducationalSpace>,
  ): Promise<EducationalSpace> {
    return await createOneWithRelations(
      this.repo,
      newEducationalSpace,
      'educationalSpace',
    );
  }

  async deleteMany(educationalSpaceIds: number[]): Promise<void> {
    await this.repo.delete(educationalSpaceIds);
  }
}
