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
import { AnswerOptionIntoTagContribution } from '../model';

@Injectable()
export class AnswerOptionIntoTagContributionRepo {
  constructor(
    @InjectRepository(AnswerOptionIntoTagContribution)
    private readonly repo: Repository<AnswerOptionIntoTagContribution>,
  ) {}

  async getOneById(id: number): Promise<AnswerOptionIntoTagContribution> {
    const answerOptionIntoTagContribution = await this.repo.findOne({
      where: { id },
    });
    if (!answerOptionIntoTagContribution)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(
          id,
          'answerOptionIntoTagContribution',
        ),
      );
    return answerOptionIntoTagContribution;
  }

  async updateOneWithRelations(
    updatedAnswerOptionIntoTagContribution: UpdatedEntity<AnswerOptionIntoTagContribution>,
  ): Promise<AnswerOptionIntoTagContribution> {
    return await updateOneWithRelations(
      this.repo,
      updatedAnswerOptionIntoTagContribution,
      'answerOptionIntoTagContribution',
    );
  }

  async createOneWithRelations(
    newAnswerOptionIntoTagContribution: NewEntity<AnswerOptionIntoTagContribution>,
  ): Promise<AnswerOptionIntoTagContribution> {
    return await createOneWithRelations(
      this.repo,
      newAnswerOptionIntoTagContribution,
      'answerOptionIntoTagContribution',
    );
  }

  async deleteMany(
    answerOptionIntoTagContributionIds: number[],
  ): Promise<void> {
    await this.repo.delete(answerOptionIntoTagContributionIds);
  }
}
