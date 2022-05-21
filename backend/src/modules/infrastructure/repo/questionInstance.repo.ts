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
    updatedQuestionInstance: UpdatedEntity<QuestionInstance>,
  ): Promise<QuestionInstance> {
    return await updateOneWithRelations(
      this.repo,
      updatedQuestionInstance,
      'questionInstance',
    );
  }

  async createOneWithRelations(
    newQuestionInstance: NewEntity<QuestionInstance>,
  ): Promise<QuestionInstance> {
    return await createOneWithRelations(
      this.repo,
      newQuestionInstance,
      'questionInstance',
    );
  }

  async deleteMany(questionInstanceIds: number[]): Promise<void> {
    await this.repo.delete(questionInstanceIds);
  }
}
