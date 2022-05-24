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
import { AnswerOptionInstance } from '../model';

@Injectable()
export class AnswerOptionInstanceRepo {
  constructor(
    @InjectRepository(AnswerOptionInstance)
    private readonly repo: Repository<AnswerOptionInstance>,
  ) {}

  async getOneById(id: number): Promise<AnswerOptionInstance> {
    const answerOptionInstance = await this.repo.findOne({ where: { id } });
    if (!answerOptionInstance)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'answerOptionInstance'),
      );
    return answerOptionInstance;
  }

  async updateOneWithRelations(
    updatedAnswerOptionInstance: UpdateEntity<AnswerOptionInstance, 'id'>,
  ): Promise<AnswerOptionInstance> {
    return await updateOneWithRelations<AnswerOptionInstance, 'id'>(
      this.repo,
      updatedAnswerOptionInstance,
    );
  }

  async createOneWithRelations(
    newAnswerOptionInstance: NewEntity<AnswerOptionInstance, 'id'>,
  ): Promise<CreatedEntity<AnswerOptionInstance, 'id'>> {
    return await createOneWithRelations(this.repo, newAnswerOptionInstance);
  }

  async createManyWithRelations(
    newAnswerOptionInstances: NewEntity<AnswerOptionInstance, 'id'>[],
  ): Promise<CreatedEntity<AnswerOptionInstance, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAnswerOptionInstances);
  }

  async deleteMany(answerOptionInstanceIds: number[]): Promise<void> {
    await this.repo.delete(answerOptionInstanceIds);
  }
}
