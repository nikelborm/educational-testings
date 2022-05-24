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
    updatedAbstractAnswerOption: UpdateEntity<AbstractAnswerOption, 'id'>,
  ): Promise<AbstractAnswerOption> {
    return await updateOneWithRelations<AbstractAnswerOption, 'id'>(
      this.repo,
      updatedAbstractAnswerOption,
    );
  }

  async createOneWithRelations(
    newAbstractAnswerOption: NewEntity<AbstractAnswerOption, 'id'>,
  ): Promise<CreatedEntity<AbstractAnswerOption, 'id'>> {
    return await createOneWithRelations(this.repo, newAbstractAnswerOption);
  }

  async createManyWithRelations(
    newAbstractAnswerOptions: NewEntity<AbstractAnswerOption, 'id'>[],
  ): Promise<CreatedEntity<AbstractAnswerOption, 'id'>[]> {
    return await createManyWithRelations(this.repo, newAbstractAnswerOptions);
  }

  async deleteMany(abstractAnswerOptionIds: number[]): Promise<void> {
    await this.repo.delete(abstractAnswerOptionIds);
  }
}
