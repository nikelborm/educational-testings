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
import { AbstractTestingStage } from '../model';

@Injectable()
export class AbstractTestingStageRepo {
  constructor(
    @InjectRepository(AbstractTestingStage)
    private readonly repo: Repository<AbstractTestingStage>,
  ) {}

  async getOneById(id: number): Promise<AbstractTestingStage> {
    const abstractTestingStage = await this.repo.findOne({ where: { id } });
    if (!abstractTestingStage)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTestingStage'),
      );
    return abstractTestingStage;
  }

  async updateOneWithRelations(
    updatedAbstractTestingStage: UpdateEntity<AbstractTestingStage, 'id'>,
  ): Promise<AbstractTestingStage> {
    return await updateOneWithRelations<AbstractTestingStage, 'id'>(
      this.repo,
      updatedAbstractTestingStage,
    );
  }

  async createOneWithRelations(
    newAbstractTestingStage: NewEntity<AbstractTestingStage, 'id'>,
  ): Promise<CreatedEntity<AbstractTestingStage, 'id'>> {
    return await createOneWithRelations(this.repo, newAbstractTestingStage);
  }

  async createManyWithRelations(
    newAbstractTestingStages: NewEntity<AbstractTestingStage, 'id'>[],
  ): Promise<CreatedEntity<AbstractTestingStage, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAbstractTestingStages);
  }

  async deleteMany(abstractTestingStageIds: number[]): Promise<void> {
    await this.repo.delete(abstractTestingStageIds);
  }
}
