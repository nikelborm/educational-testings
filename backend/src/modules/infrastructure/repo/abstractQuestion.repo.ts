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
    updatedAbstractQuestion: UpdatedEntity<AbstractQuestion>,
  ): Promise<AbstractQuestion> {
    return await updateOneWithRelations(
      this.repo,
      updatedAbstractQuestion,
      'abstractQuestion',
    );
  }

  async createOneWithRelations(
    newAbstractQuestion: NewEntity<AbstractQuestion>,
  ): Promise<AbstractQuestion> {
    return await createOneWithRelations(
      this.repo,
      newAbstractQuestion,
      'abstractQuestion',
    );
  }

  async deleteMany(abstractQuestionIds: number[]): Promise<void> {
    await this.repo.delete(abstractQuestionIds);
  }
}
