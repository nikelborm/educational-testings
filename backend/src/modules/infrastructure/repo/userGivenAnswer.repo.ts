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
    updatedUserGivenAnswer: UpdatedEntity<UserGivenAnswer>,
  ): Promise<UserGivenAnswer> {
    return await updateOneWithRelations(
      this.repo,
      updatedUserGivenAnswer,
      'userGivenAnswer',
    );
  }

  async createOneWithRelations(
    newUserGivenAnswer: NewEntity<UserGivenAnswer>,
  ): Promise<UserGivenAnswer> {
    return await createOneWithRelations(
      this.repo,
      newUserGivenAnswer,
      'userGivenAnswer',
    );
  }

  async deleteMany(userGivenAnswerIds: number[]): Promise<void> {
    await this.repo.delete(userGivenAnswerIds);
  }
}
