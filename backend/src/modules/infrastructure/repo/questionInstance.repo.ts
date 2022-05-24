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
import { QuestionInstance } from '../model';

@Injectable()
export class QuestionInstanceRepo {
  constructor(
    @InjectRepository(QuestionInstance)
    private readonly repo: Repository<QuestionInstance>,
  ) {}

  async getOneById(id: number): Promise<QuestionInstance> {
    const questionInstance = await this.repo.findOne({
      where: { id },
    });
    if (!questionInstance)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'questionInstance'),
      );
    return questionInstance;
  }

  async updateOneWithRelations(
    updatedQuestionInstance: UpdateEntity<QuestionInstance, 'id'>,
  ): Promise<QuestionInstance> {
    return await updateOneWithRelations<QuestionInstance, 'id'>(
      this.repo,
      updatedQuestionInstance,
    );
  }

  async createOneWithRelations(
    newQuestionInstance: NewEntity<QuestionInstance, 'id'>,
  ): Promise<CreatedEntity<QuestionInstance, 'id'>> {
    return await createOneWithRelations(this.repo, newQuestionInstance);
  }

  async createManyWithRelations(
    newQuestionInstances: NewEntity<QuestionInstance, 'id'>[],
  ): Promise<CreatedEntity<QuestionInstance, 'id'>[]> {
    return await createManyWithRelations(this.repo, newQuestionInstances);
  }

  async deleteMany(questionInstanceIds: number[]): Promise<void> {
    await this.repo.delete(questionInstanceIds);
  }
}
