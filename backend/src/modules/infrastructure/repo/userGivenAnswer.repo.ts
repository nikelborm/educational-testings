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
import { UserGivenAnswer } from '../model';

@Injectable()
export class UserGivenAnswerRepo {
  constructor(
    @InjectRepository(UserGivenAnswer)
    private readonly repo: Repository<UserGivenAnswer>,
  ) {}

  async getOneById(id: number): Promise<UserGivenAnswer> {
    const userGivenAnswer = await this.repo.findOne({
      where: { id },
    });
    if (!userGivenAnswer)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'userGivenAnswer'),
      );
    return userGivenAnswer;
  }

  async updateOneWithRelations(
    updatedUserGivenAnswer: UpdateEntity<UserGivenAnswer, 'id'>,
  ): Promise<UserGivenAnswer> {
    return await updateOneWithRelations<UserGivenAnswer, 'id'>(
      this.repo,
      updatedUserGivenAnswer,
    );
  }

  async createOneWithRelations(
    newUserGivenAnswer: NewEntity<UserGivenAnswer, 'id'>,
  ): Promise<CreatedEntity<UserGivenAnswer, 'id'>> {
    return await createOneWithRelations(this.repo, newUserGivenAnswer);
  }

  async createManyWithRelations(
    newUserGivenAnswers: NewEntity<UserGivenAnswer, 'id'>[],
  ): Promise<CreatedEntity<UserGivenAnswer, 'id'>[]> {
    return await createManyWithRelations(this.repo, newUserGivenAnswers);
  }

  async deleteMany(userGivenAnswerIds: number[]): Promise<void> {
    await this.repo.delete(userGivenAnswerIds);
  }
}
