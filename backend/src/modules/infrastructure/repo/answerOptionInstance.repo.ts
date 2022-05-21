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
    updatedAnswerOptionInstance: UpdatedEntity<AnswerOptionInstance>,
  ): Promise<AnswerOptionInstance> {
    return await updateOneWithRelations(
      this.repo,
      updatedAnswerOptionInstance,
      'answerOptionInstance',
    );
  }

  async createOneWithRelations(
    newAnswerOptionInstance: NewEntity<AnswerOptionInstance>,
  ): Promise<AnswerOptionInstance> {
    return await createOneWithRelations(
      this.repo,
      newAnswerOptionInstance,
      'answerOptionInstance',
    );
  }

  async deleteMany(answerOptionInstanceIds: number[]): Promise<void> {
    await this.repo.delete(answerOptionInstanceIds);
  }
}
