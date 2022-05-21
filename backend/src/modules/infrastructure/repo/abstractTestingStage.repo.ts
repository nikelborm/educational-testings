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
    updatedAbstractTestingStage: UpdatedEntity<AbstractTestingStage>,
  ): Promise<AbstractTestingStage> {
    return await updateOneWithRelations(
      this.repo,
      updatedAbstractTestingStage,
      'abstractTestingStage',
    );
  }

  async createOneWithRelations(
    newAbstractTestingStage: NewEntity<AbstractTestingStage>,
  ): Promise<AbstractTestingStage> {
    return await createOneWithRelations(
      this.repo,
      newAbstractTestingStage,
      'abstractTestingStage',
    );
  }

  async deleteMany(abstractTestingStageIds: number[]): Promise<void> {
    await this.repo.delete(abstractTestingStageIds);
  }
}
