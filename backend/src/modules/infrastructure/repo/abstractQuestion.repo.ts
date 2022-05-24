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
import { AbstractQuestion } from '../model';

@Injectable()
export class AbstractQuestionRepo {
  constructor(
    @InjectRepository(AbstractQuestion)
    private readonly repo: Repository<AbstractQuestion>,
  ) {}

  async getOneById(id: number): Promise<AbstractQuestion> {
    const abstractQuestion = await this.repo.findOne({ where: { id } });
    if (!abstractQuestion)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractQuestion'),
      );
    return abstractQuestion;
  }

  async updateOneWithRelations(
    updatedAbstractQuestion: UpdateEntity<AbstractQuestion, 'id'>,
  ): Promise<AbstractQuestion> {
    return await updateOneWithRelations<AbstractQuestion, 'id'>(
      this.repo,
      updatedAbstractQuestion,
    );
  }

  async createOneWithRelations(
    newAbstractQuestion: NewEntity<AbstractQuestion, 'id'>,
  ): Promise<CreatedEntity<AbstractQuestion, 'id'>> {
    return await createOneWithRelations(this.repo, newAbstractQuestion);
  }

  async createManyWithRelations(
    newAbstractQuestions: NewEntity<AbstractQuestion, 'id'>[],
  ): Promise<CreatedEntity<AbstractQuestion, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAbstractQuestions);
  }

  async deleteMany(abstractQuestionIds: number[]): Promise<void> {
    await this.repo.delete(abstractQuestionIds);
  }
}
