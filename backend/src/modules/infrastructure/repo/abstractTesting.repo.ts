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
import { AbstractTesting } from '../model';

@Injectable()
export class AbstractTestingRepo {
  constructor(
    @InjectRepository(AbstractTesting)
    private readonly repo: Repository<AbstractTesting>,
  ) {}

  async getOneById(id: number): Promise<AbstractTesting> {
    const abstractTesting = await this.repo.findOne({ where: { id } });
    if (!abstractTesting)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById(id, 'abstractTesting'),
      );
    return abstractTesting;
  }

  async updateOneWithRelations(
    updatedAbstractTesting: UpdatedEntity<AbstractTesting>,
  ): Promise<AbstractTesting> {
    return await updateOneWithRelations(
      this.repo,
      updatedAbstractTesting,
      'abstractTesting',
    );
  }

  async createOneWithRelations(
    newAbstractTesting: NewEntity<AbstractTesting>,
  ): Promise<AbstractTesting> {
    return await createOneWithRelations(
      this.repo,
      newAbstractTesting,
      'abstractTesting',
    );
  }

  async deleteMany(abstractTestingIds: number[]): Promise<void> {
    await this.repo.delete(abstractTestingIds);
  }
}
