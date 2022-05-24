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
    updatedAnswerOptionIntoTagContribution: UpdateEntity<
      AnswerOptionIntoTagContribution,
      'id'
    >,
  ): Promise<AnswerOptionIntoTagContribution> {
    return await updateOneWithRelations<AnswerOptionIntoTagContribution, 'id'>(
      this.repo,
      updatedAnswerOptionIntoTagContribution,
    );
  }

  async createOneWithRelations(
    newAnswerOptionIntoTagContribution: NewEntity<
      AnswerOptionIntoTagContribution,
      'id'
    >,
  ): Promise<CreatedEntity<AnswerOptionIntoTagContribution, 'id'>> {
    return await createOneWithRelations(
      this.repo,
      newAnswerOptionIntoTagContribution,
    );
  }

  async createManyWithRelations(
    newAnswerOptionIntoTagContributions: NewEntity<
      AnswerOptionIntoTagContribution,
      'id'
    >[],
  ): Promise<CreatedEntity<AnswerOptionIntoTagContribution, 'id'>[]> {
    return await createManyWithRelations(
      this.repo,
      newAnswerOptionIntoTagContributions,
    );
  }

  async deleteMany(
    answerOptionIntoTagContributionIds: number[],
  ): Promise<void> {
    await this.repo.delete(answerOptionIntoTagContributionIds);
  }
}
