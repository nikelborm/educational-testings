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
import { AbstractAnswerOption } from '../model';

@Injectable()
export class AbstractAnswerOptionRepo {
  constructor(
    @InjectRepository(AbstractAnswerOption)
    private readonly repo: Repository<AbstractAnswerOption>,
  ) {}

  async getOneById(id: number): Promise<AbstractAnswerOption> {
    const abstractAnswerOption = await this.repo.findOne({ where: { id } });
    if (!abstractAnswerOption)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractAnswerOption'),
      );
    return abstractAnswerOption;
  }

  async updateOneWithRelations(
    updatedAbstractAnswerOption: UpdatedEntity<AbstractAnswerOption>,
  ): Promise<AbstractAnswerOption> {
    return await updateOneWithRelations(
      this.repo,
      updatedAbstractAnswerOption,
      'abstractAnswerOption',
    );
  }

  async createOneWithRelations(
    newAbstractAnswerOption: NewEntity<AbstractAnswerOption>,
  ): Promise<AbstractAnswerOption> {
    return await createOneWithRelations(
      this.repo,
      newAbstractAnswerOption,
      'abstractAnswerOption',
    );
  }

  async deleteMany(abstractAnswerOptionIds: number[]): Promise<void> {
    await this.repo.delete(abstractAnswerOptionIds);
  }
}
